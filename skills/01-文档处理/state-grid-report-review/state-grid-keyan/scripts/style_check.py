#!/usr/bin/env python3
"""Style check for a Chinese power-grid scientific research report (markdown).

Detects:
- AI-style "**前缀：** ..." paragraphs and long runs of them
- short / long paragraphs by Chinese character count
- colloquial words inappropriate in formal scientific writing
- non-standard terminology with suggested replacements

Usage: python3 style_check.py <path-to-report.md>
Output: JSON to stdout.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

HEADING_RE = re.compile(r"^#{1,6}\s+")
REF_BLOCK_RE = re.compile(r"^>\s*\[\d+\]")
AI_BOLD_PREFIX_RE = re.compile(r"^\s*\*\*[^*\n]{1,30}[：:]\s*\*\*")

COLLOQUIAL_WORDS = [
    "我们", "咱们", "大家", "接下来", "那么", "其实", "简单来说",
    "总而言之", "总之", "说白了", "可以说是", "毋庸置疑", "众所周知",
    "非常重要", "极其重要", "至关重要的是", "首先要明白",
]

OVERSELL_WORDS = [
    "颠覆性", "革命性", "突破性", "里程碑式", "划时代", "飞跃式",
    "国际领先", "国内首创", "全球首个", "前所未有",
]

TERM_REPLACEMENTS = {
    "新一代电网": "新型电力系统",
    "新一代智慧电网": "新型电力系统",
    "智慧电网升级版": "新型电力系统",
    "智能电网2.0": "新型电力系统",
    "碳达峰碳中和目标": "双碳目标",
    "电源-网-用户-储能": "源网荷储",
    "源-网-荷-储": "源网荷储",
    "电源网荷储": "源网荷储",
    "AI技术": "人工智能技术",
    "人工智能AI": "人工智能",
    "电力大数据": "电力数据",  # only if used as a vague slogan; leave a soft warning
}


def count_chinese_chars(text: str) -> int:
    return sum(1 for ch in text if "一" <= ch <= "鿿")


def split_paragraphs(md: str) -> list[tuple[int, str]]:
    """Return list of (line_no_of_first_line, paragraph_text) for body paragraphs only."""
    lines = md.splitlines()
    paragraphs: list[tuple[int, str]] = []
    buf: list[str] = []
    start_line = 0
    in_code = False
    for i, line in enumerate(lines, start=1):
        if line.strip().startswith("```"):
            in_code = not in_code
            if buf:
                paragraphs.append((start_line, "\n".join(buf).strip()))
                buf = []
            continue
        if in_code:
            continue
        if HEADING_RE.match(line):
            if buf:
                paragraphs.append((start_line, "\n".join(buf).strip()))
                buf = []
            continue
        if not line.strip():
            if buf:
                paragraphs.append((start_line, "\n".join(buf).strip()))
                buf = []
            continue
        if not buf:
            start_line = i
        buf.append(line)
    if buf:
        paragraphs.append((start_line, "\n".join(buf).strip()))

    cleaned: list[tuple[int, str]] = []
    for ln, p in paragraphs:
        if REF_BLOCK_RE.match(p):
            continue
        if p.startswith("|"):
            continue
        if p.startswith("!["):
            continue
        cleaned.append((ln, p))
    return cleaned


def detect_ai_style(paragraphs: list[tuple[int, str]]) -> dict:
    flags = [bool(AI_BOLD_PREFIX_RE.match(p)) for _, p in paragraphs]
    ai_paragraph_indices = [i for i, f in enumerate(flags) if f]
    para_runs: list[dict] = []
    i = 0
    while i < len(flags):
        if flags[i]:
            j = i
            while j < len(flags) and flags[j]:
                j += 1
            if j - i >= 3:
                para_runs.append(
                    {
                        "start_line": paragraphs[i][0],
                        "end_line": paragraphs[j - 1][0],
                        "length": j - i,
                        "preview": paragraphs[i][1][:60],
                    }
                )
            i = j
        else:
            i += 1

    line_runs: list[dict] = []
    total_ai_lines = 0
    for ln_start, p in paragraphs:
        lines = p.split("\n")
        line_flags = [bool(AI_BOLD_PREFIX_RE.match(l)) for l in lines]
        total_ai_lines += sum(line_flags)
        k = 0
        while k < len(line_flags):
            if line_flags[k]:
                m = k
                while m < len(line_flags) and line_flags[m]:
                    m += 1
                if m - k >= 3:
                    line_runs.append(
                        {
                            "start_line": ln_start + k,
                            "end_line": ln_start + m - 1,
                            "length": m - k,
                            "preview": lines[k][:60],
                        }
                    )
                k = m
            else:
                k += 1

    return {
        "ai_paragraph_count": len(ai_paragraph_indices),
        "ai_paragraph_ratio": (
            round(len(ai_paragraph_indices) / len(paragraphs), 3) if paragraphs else 0
        ),
        "ai_style_paragraph_runs": para_runs,
        "ai_style_line_count": total_ai_lines,
        "ai_style_line_runs": line_runs,
    }


def detect_length(paragraphs: list[tuple[int, str]]) -> dict:
    lens = [(ln, count_chinese_chars(p)) for ln, p in paragraphs]
    short = [{"line": ln, "chars": n} for ln, n in lens if 0 < n < 100]
    long_ = [{"line": ln, "chars": n} for ln, n in lens if n > 400]
    counts = [n for _, n in lens if n > 0]
    avg = round(sum(counts) / len(counts), 1) if counts else 0
    return {
        "paragraph_count": len(paragraphs),
        "avg_chinese_chars_per_paragraph": avg,
        "short_paragraphs": short,
        "long_paragraphs": long_,
    }


def detect_colloquial(paragraphs: list[tuple[int, str]]) -> list[dict]:
    hits: list[dict] = []
    for ln, p in paragraphs:
        for w in COLLOQUIAL_WORDS:
            if w in p:
                hits.append({"line": ln, "word": w, "type": "colloquial"})
        for w in OVERSELL_WORDS:
            if w in p:
                hits.append({"line": ln, "word": w, "type": "oversell"})
    return hits


def detect_terms(paragraphs: list[tuple[int, str]]) -> list[dict]:
    warnings: list[dict] = []
    for ln, p in paragraphs:
        for bad, good in TERM_REPLACEMENTS.items():
            if bad in p:
                warnings.append(
                    {
                        "line": ln,
                        "found": bad,
                        "suggest": good,
                    }
                )
    return warnings


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("path", help="path to markdown report")
    args = ap.parse_args()
    path = Path(args.path)
    if not path.exists():
        print(json.dumps({"error": f"file not found: {path}"}, ensure_ascii=False))
        return 1
    md = path.read_text(encoding="utf-8")
    paragraphs = split_paragraphs(md)

    result = {
        "ai_style": detect_ai_style(paragraphs),
        "length": detect_length(paragraphs),
        "colloquial_hits": detect_colloquial(paragraphs),
        "term_warnings": detect_terms(paragraphs),
    }
    json.dump(result, sys.stdout, ensure_ascii=False, indent=2)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
