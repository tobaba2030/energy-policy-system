#!/usr/bin/env python3
"""Extract chapter/section outline and paragraph statistics from a markdown report.

Usage: python3 extract_structure.py <path-to-report.md>
Output: JSON to stdout.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

HEADING_RE = re.compile(r"^(#{1,4})\s+(.+?)\s*$")
REF_BLOCK_RE = re.compile(r"^>\s*\[\d+\]")


def count_chars(text: str) -> int:
    return sum(1 for ch in text if not ch.isspace())


def split_paragraphs(body: str) -> list[str]:
    raw = re.split(r"\n\s*\n", body.strip())
    paragraphs: list[str] = []
    for block in raw:
        block = block.strip()
        if not block:
            continue
        if REF_BLOCK_RE.match(block):
            continue
        if block.startswith("|"):
            continue
        if block.startswith("```"):
            continue
        if block.startswith("!["):
            continue
        paragraphs.append(block)
    return paragraphs


def parse(md: str) -> dict:
    lines = md.splitlines()
    sections: list[dict] = []
    current: dict | None = None
    buffer: list[str] = []

    def flush():
        nonlocal buffer, current
        if current is None:
            return
        body = "\n".join(buffer).strip()
        paragraphs = split_paragraphs(body)
        para_chars = [count_chars(p) for p in paragraphs]
        current["char_count"] = sum(para_chars)
        current["paragraph_count"] = len(paragraphs)
        current["avg_paragraph_chars"] = (
            round(sum(para_chars) / len(para_chars), 1) if para_chars else 0
        )
        current["max_paragraph_chars"] = max(para_chars) if para_chars else 0
        current["min_paragraph_chars"] = min(para_chars) if para_chars else 0
        buffer = []

    for line in lines:
        m = HEADING_RE.match(line)
        if m:
            flush()
            level = len(m.group(1))
            title = m.group(2).strip()
            current = {
                "level": level,
                "title": title,
                "char_count": 0,
                "paragraph_count": 0,
                "avg_paragraph_chars": 0,
                "max_paragraph_chars": 0,
                "min_paragraph_chars": 0,
            }
            sections.append(current)
        else:
            if current is not None:
                buffer.append(line)
    flush()

    warnings: list[dict] = []
    for sec in sections:
        if sec["level"] <= 3 and sec["paragraph_count"] > 0 and sec["char_count"] < 200:
            warnings.append(
                {
                    "section": sec["title"],
                    "type": "too_short",
                    "char_count": sec["char_count"],
                    "hint": "章节内容过少（<200 字），可能存在空挂或论述不足。",
                }
            )
        if sec["max_paragraph_chars"] > 600:
            warnings.append(
                {
                    "section": sec["title"],
                    "type": "long_paragraph",
                    "max_paragraph_chars": sec["max_paragraph_chars"],
                    "hint": "存在单段超长段落（>600 字），建议拆分以提高可读性。",
                }
            )

    total_chars = sum(s["char_count"] for s in sections)
    h1_count = sum(1 for s in sections if s["level"] == 1)
    h2_count = sum(1 for s in sections if s["level"] == 2)
    h3_count = sum(1 for s in sections if s["level"] == 3)

    return {
        "outline": sections,
        "stats": {
            "total_chars": total_chars,
            "section_count_h1": h1_count,
            "section_count_h2": h2_count,
            "section_count_h3": h3_count,
            "section_count_total": len(sections),
        },
        "warnings": warnings,
    }


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("path", help="path to markdown report")
    args = ap.parse_args()
    path = Path(args.path)
    if not path.exists():
        print(json.dumps({"error": f"file not found: {path}"}, ensure_ascii=False))
        return 1
    md = path.read_text(encoding="utf-8")
    result = parse(md)
    json.dump(result, sys.stdout, ensure_ascii=False, indent=2)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
