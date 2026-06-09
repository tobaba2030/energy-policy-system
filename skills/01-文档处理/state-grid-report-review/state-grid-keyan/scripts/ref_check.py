#!/usr/bin/env python3
"""Reference-list checker for a Chinese power-grid research report (markdown).

Extracts reference entries written as `> [n] ...` (blockquote convention used by the
sister skill `state-grid-keyan`), then checks:
- by type breakdown ([J] journal, [M] book, [C] conference, [D] thesis, [S] standard)
- format issues (missing year / pages / volume / journal name)
- chinese vs english share
- recent-five-years share (relative to a configurable current year)
- coverage of canonical power-grid venues (heuristic substring match)

Usage: python3 ref_check.py <path-to-report.md> [--current-year 2026]
Output: JSON to stdout.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

REF_LINE_RE = re.compile(r"^>\s*\[(\d+)\]\s*(.+?)\s*$")
TYPE_RE = re.compile(r"\[([JMCDSPNRO])\]")
YEAR_RE = re.compile(r"(19|20)\d{2}")
VOLUME_ISSUE_RE = re.compile(r"\d+\s*\(\s*\d+\s*\)")
PAGES_RE = re.compile(r"\d+\s*[-–]\s*\d+")

CN_RANGE = ("一", "鿿")
CANONICAL_VENUES = [
    "IEEE Transactions on Power Systems",
    "IEEE Transactions on Smart Grid",
    "IEEE Transactions on Power Delivery",
    "IEEE Transactions on Sustainable Energy",
    "IEEE Transactions on Industrial Informatics",
    "IET Generation, Transmission",
    "Applied Energy",
    "Energy Conversion and Management",
    "International Journal of Electrical Power",
    "中国电机工程学报",
    "电力系统自动化",
    "电网技术",
    "高电压技术",
    "电力系统保护与控制",
    "电工技术学报",
    "中国电力",
    "电力自动化设备",
    "南方电网技术",
]


def has_chinese(s: str) -> bool:
    return any(CN_RANGE[0] <= ch <= CN_RANGE[1] for ch in s)


def extract_refs(md: str) -> list[dict]:
    refs: list[dict] = []
    for i, line in enumerate(md.splitlines(), start=1):
        m = REF_LINE_RE.match(line)
        if not m:
            continue
        idx = int(m.group(1))
        body = m.group(2)
        type_m = TYPE_RE.search(body)
        ref_type = type_m.group(1) if type_m else None
        year_m = YEAR_RE.search(body)
        year = int(year_m.group(0)) if year_m else None
        has_vol = bool(VOLUME_ISSUE_RE.search(body))
        has_pages = bool(PAGES_RE.search(body))
        lang = "cn" if has_chinese(body) else "en"
        refs.append(
            {
                "n": idx,
                "line": i,
                "body": body,
                "type": ref_type,
                "year": year,
                "has_vol_issue": has_vol,
                "has_pages": has_pages,
                "lang": lang,
            }
        )
    return refs


def check_format(ref: dict) -> list[str]:
    issues: list[str] = []
    if ref["type"] is None:
        issues.append("缺少类型标记 [J]/[M]/[C]/[D]/[S]")
    if ref["year"] is None:
        issues.append("缺少年份")
    if ref["type"] == "J":
        if not ref["has_vol_issue"]:
            issues.append("期刊文献缺少卷(期)信息")
        if not ref["has_pages"]:
            issues.append("期刊文献缺少页码")
    if ref["type"] == "C":
        if not ref["has_pages"]:
            issues.append("会议文献建议补充页码")
    return issues


def venue_coverage(refs: list[dict]) -> dict[str, int]:
    bodies = "\n".join(r["body"] for r in refs)
    coverage: dict[str, int] = {}
    for v in CANONICAL_VENUES:
        cnt = bodies.count(v)
        if cnt > 0:
            coverage[v] = cnt
    return coverage


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("path", help="path to markdown report")
    ap.add_argument("--current-year", type=int, default=2026)
    args = ap.parse_args()
    path = Path(args.path)
    if not path.exists():
        print(json.dumps({"error": f"file not found: {path}"}, ensure_ascii=False))
        return 1
    md = path.read_text(encoding="utf-8")
    refs = extract_refs(md)
    by_type: dict[str, int] = {}
    cn = en = 0
    recent = 0
    yearable = 0
    format_issues: list[dict] = []
    for r in refs:
        if r["type"]:
            by_type[r["type"]] = by_type.get(r["type"], 0) + 1
        else:
            by_type["unknown"] = by_type.get("unknown", 0) + 1
        if r["lang"] == "cn":
            cn += 1
        else:
            en += 1
        if r["year"] is not None:
            yearable += 1
            if r["year"] >= args.current_year - 4:
                recent += 1
        issues = check_format(r)
        if issues:
            format_issues.append({"n": r["n"], "line": r["line"], "issues": issues, "body": r["body"][:80]})

    total = len(refs)
    result = {
        "current_year": args.current_year,
        "total": total,
        "by_type": by_type,
        "cn_en": {"cn": cn, "en": en, "en_ratio": round(en / total, 3) if total else 0},
        "recent_five_years": {
            "recent": recent,
            "with_year": yearable,
            "ratio": round(recent / yearable, 3) if yearable else 0,
        },
        "venue_coverage": venue_coverage(refs),
        "format_issues": format_issues,
        "summary_flags": {
            "total_below_60": total < 60,
            "total_above_100": total > 100,
            "english_below_30pct": (en / total < 0.30) if total else True,
            "recent_below_50pct": (recent / yearable < 0.50) if yearable else True,
            "venue_coverage_thin": len(venue_coverage(refs)) < 3,
        },
    }
    json.dump(result, sys.stdout, ensure_ascii=False, indent=2)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
