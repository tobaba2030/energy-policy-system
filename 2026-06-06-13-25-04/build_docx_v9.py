# -*- coding: utf-8 -*-
"""Build v9 DOCX from markdown source for VPP AI+ proposal"""

import re, os
from docx import Document
from docx.shared import Pt, Cm, RGBColor, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from lxml import etree

# ── helpers ──────────────────────────────────────────────────────────

def qn_ns(tag):
    return "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}" + tag

def shade_cell(cell, fill_hex='D5E8F0'):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    shd = etree.SubElement(tcPr, qn_ns('shd'))
    shd.set(qn_ns('val'), 'clear')
    shd.set(qn_ns('color'), 'auto')
    shd.set(qn_ns('fill'), fill_hex)

def set_cell_border(cell, color='B0B0B0'):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    borders = etree.SubElement(tcPr, qn_ns('tcBorders'))
    for side in ('top','left','bottom','right'):
        b = etree.SubElement(borders, qn_ns(side))
        b.set(qn_ns('val'), 'single')
        b.set(qn_ns('sz'), '4')
        b.set(qn_ns('color'), color)
        b.set(qn_ns('space'), '0')

def set_run_font(run, size=10.5, bold=False, name='仿宋', color=None):
    run.bold = bold
    run.font.size = Pt(size)
    run.font.name = name
    run._element.rPr.rFonts.set(qn_ns('eastAsia'), name)
    if color:
        run.font.color.rgb = RGBColor(*color)

def add_heading_styled(doc, text, level=1):
    h = doc.add_heading(text, level=level)
    for run in h.runs:
        run.font.name = '黑体'
        run._element.rPr.rFonts.set(qn_ns('eastAsia'), '黑体')
        run.font.color.rgb = RGBColor(0, 0, 0)
    return h

def add_para(doc, text, size=10.5, bold=False, name='仿宋', indent=False, color=None):
    p = doc.add_paragraph()
    if indent:
        p.paragraph_format.first_line_indent = Cm(0.74)
    run = p.add_run(text)
    set_run_font(run, size=size, bold=bold, name=name, color=color)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.line_spacing = Pt(18)
    return p

def add_table(doc, headers, rows, col_widths=None):
    ncols = len(headers)
    table = doc.add_table(rows=1+len(rows), cols=ncols, style='Table Grid')
    # table.alignment = WD_TABLE_ALIGNMENT.CENTER  # not available in this version
    # header
    for i, h in enumerate(headers):
        cell = table.rows[0].cells[i]
        cell.text = ''
        run = cell.paragraphs[0].add_run(h)
        set_run_font(run, size=9, bold=True, name='黑体', color=(255,255,255))
        cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
        shade_cell(cell, '2E75B6')
        set_cell_border(cell)
    # rows
    for ri, row_data in enumerate(rows):
        for ci, val in enumerate(row_data):
            cell = table.rows[ri+1].cells[ci]
            cell.text = ''
            run = cell.paragraphs[0].add_run(str(val))
            set_run_font(run, size=9, name='仿宋')
            set_cell_border(cell)
    if col_widths:
        for i, w in enumerate(col_widths):
            for row in table.rows:
                row.cells[i].width = Cm(w)
    return table


# ── parse markdown ──────────────────────────────────────────────────

def parse_md(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    sections = []
    cur_title = ''
    cur_lines = []
    for line in lines:
        stripped = line.rstrip('\n')
        if stripped.startswith('## ') or stripped.startswith('### ') or stripped.startswith('#### '):
            if cur_title or cur_lines:
                sections.append((cur_title, cur_lines))
            cur_title = stripped
            cur_lines = []
        else:
            cur_lines.append(stripped)
    if cur_title or cur_lines:
        sections.append((cur_title, cur_lines))
    return sections


def md_text_to_docx(doc, text, base_size=10.5, base_name='仿宋'):
    """Render a block of markdown text into docx paragraphs."""
    # Split by blank lines into paragraphs
    paras = re.split(r'\n\s*\n', text.strip())
    for para_text in paras:
        if not para_text.strip():
            continue
        lines = para_text.strip().split('\n')
        for line in lines:
            line = line.strip()
            if not line:
                continue
            # table
            if line.startswith('|') and '|' in line[1:]:
                continue  # tables handled separately
            # bullet
            if line.startswith('- ') or line.startswith('* '):
                add_para(doc, line[2:], size=base_size, name=base_name, indent=True)
            # numbered
            elif re.match(r'^\*\*\(\d\)\*\*', line):
                content = re.sub(r'^\*\*\(\d\)\*\*\s*', '', line)
                p = doc.add_paragraph()
                p.paragraph_format.first_line_indent = Cm(0.74)
                p.paragraph_format.space_after = Pt(4)
                p.paragraph_format.line_spacing = Pt(18)
                # bold title part
                parts = re.split(r'(\*\*.*?\*\*)', content)
                for part in parts:
                    if part.startswith('**') and part.endswith('**'):
                        run = p.add_run(part[2:-2])
                        set_run_font(run, size=base_size, bold=True, name=base_name)
                    else:
                        run = p.add_run(part)
                        set_run_font(run, size=base_size, name=base_name)
            elif re.match(r'^\*\*.*?\*\*', line):
                p = doc.add_paragraph()
                p.paragraph_format.first_line_indent = Cm(0.74)
                p.paragraph_format.space_after = Pt(4)
                p.paragraph_format.line_spacing = Pt(18)
                parts = re.split(r'(\*\*.*?\*\*)', line)
                for part in parts:
                    if part.startswith('**') and part.endswith('**'):
                        run = p.add_run(part[2:-2])
                        set_run_font(run, size=base_size, bold=True, name=base_name)
                    else:
                        run = p.add_run(part)
                        set_run_font(run, size=base_size, name=base_name)
            else:
                add_para(doc, line, size=base_size, name=base_name, indent=True)


def extract_table(lines):
    """Extract table rows from markdown lines starting with |"""
    rows = []
    for line in lines:
        line = line.strip()
        if line.startswith('|') and '|' in line[1:]:
            cells = [c.strip() for c in line.split('|')[1:-1]]
            # skip separator row
            if cells and all(set(c) <= set('-: ') for c in cells):
                continue
            rows.append(cells)
    return rows


# ── main build ───────────────────────────────────────────────────────

def build_docx(md_path, docx_path):
    sections = parse_md(md_path)
    doc = Document()

    # page margins
    for section in doc.sections:
        section.top_margin = Cm(2.54)
        section.bottom_margin = Cm(2.54)
        section.left_margin = Cm(3.17)
        section.right_margin = Cm(3.17)

    # default font
    style = doc.styles['Normal']
    style.font.name = '仿宋'
    style.font.size = Pt(10.5)
    style._element.rPr.rFonts.set(qn_ns('eastAsia'), '仿宋')

    i = 0
    while i < len(sections):
        title, lines = sections[i]

        # ── top-level title ──
        if title.startswith('## '):
            heading_text = title[3:].strip()
            add_heading_styled(doc, heading_text, level=1)

        elif title.startswith('### '):
            heading_text = title[4:].strip()
            add_heading_styled(doc, heading_text, level=2)

        elif title.startswith('#### '):
            heading_text = title[5:].strip()
            add_heading_styled(doc, heading_text, level=3)

        # ── body content ──
        # check for tables
        table_lines = [l for l in lines if l.strip().startswith('|')]
        text_lines = [l for l in lines if not l.strip().startswith('|')]

        # render text
        body_text = '\n'.join(text_lines)
        if body_text.strip():
            # Handle section-specific formatting
            if title and ('研究目标' in title or '研究内容' in title or '技术指标' in title):
                md_text_to_docx(doc, body_text, base_size=10.5, base_name='仿宋')
            else:
                md_text_to_docx(doc, body_text, base_size=10.5, base_name='仿宋')

        # render tables
        if table_lines:
            trows = extract_table(table_lines)
            if trows:
                headers = trows[0]
                data = trows[1:] if len(trows) > 1 else []
                add_table(doc, headers, data)

        i += 1

    doc.save(docx_path)
    print(f'Saved: {docx_path}')


if __name__ == '__main__':
    base = r'C:\AI学习资料\mesheer\2026-06-06-13-25-04'
    md_file = os.path.join(base, '虚拟电厂多时空尺度智能协同运营_申报材料_v9.md')
    docx_file = os.path.join(base, '虚拟电厂多时空尺度智能协同运营_申报材料_v9.docx')
    build_docx(md_file, docx_file)
