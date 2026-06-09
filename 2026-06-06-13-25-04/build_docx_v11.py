# -*- coding: utf-8 -*-
"""Build v11 docx from v11.md - 通用Markdown转Word工具"""
import re
import os
from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from lxml import etree

def build():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    md_path = os.path.join(base_dir, '虚拟电厂多时空尺度智能协同运营_申报材料_v11.md')
    out_path = os.path.join(base_dir, '虚拟电厂多时空尺度智能协同运营_申报材料_v11.docx')

    with open(md_path, 'r', encoding='utf-8') as f:
        md_text = f.read()

    doc = Document()

    # Page margins
    for section in doc.sections:
        section.top_margin = Cm(2.54)
        section.bottom_margin = Cm(2.54)
        section.left_margin = Cm(3.17)
        section.right_margin = Cm(3.17)

    # Default style
    style = doc.styles['Normal']
    style.font.size = Pt(12)
    style.font.name = '\u4eff\u5b8b'
    style.element.rPr.rFonts.set(qn('w:eastAsia'), '\u4eff\u5b8b')
    style.paragraph_format.line_spacing = 1.5

    def set_run_font(run, size=12, bold=False, font_name='\u4eff\u5b8b'):
        run.bold = bold
        run.font.size = Pt(size)
        run.font.name = font_name
        run._element.rPr.rFonts.set(qn('w:eastAsia'), font_name)

    def add_heading(text, level):
        """level: 0=主标题(居中22pt), 1=一级(16pt黑体), 2=二级(14pt黑体), 3=三级(12pt楷体)"""
        p = doc.add_paragraph()
        if level == 0:
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            run = p.add_run(text)
            set_run_font(run, 22, True, '\u9ed1\u4f53')
        elif level == 1:
            run = p.add_run(text)
            set_run_font(run, 16, True, '\u9ed1\u4f53')
        elif level == 2:
            run = p.add_run(text)
            set_run_font(run, 14, True, '\u9ed1\u4f53')
        elif level >= 3:
            run = p.add_run(text)
            set_run_font(run, 12, True, '\u6977\u4f53')
        return p

    def add_body_with_bold(text):
        """Parse **bold** markers in text and add formatted paragraph"""
        if not text.strip():
            p = doc.add_paragraph()
            return p
        p = doc.add_paragraph()
        parts = re.split(r'(\*\*.*?\*\*)', text)
        for part in parts:
            if part.startswith('**') and part.endswith('**'):
                run = p.add_run(part[2:-2])
                set_run_font(run, 12, True, '\u4eff\u5b8b')
            else:
                run = p.add_run(part)
                set_run_font(run, 12, False, '\u4eff\u5b8b')
        return p

    def shade_cell(cell, fill_hex='D5E8F0'):
        tc = cell._tc
        tcPr = tc.get_or_add_tcPr()
        shd = etree.SubElement(tcPr, qn('w:shd'))
        shd.set(qn('w:val'), 'clear')
        shd.set(qn('w:color'), 'auto')
        shd.set(qn('w:fill'), fill_hex)

    def add_table_from_md(table_lines):
        """Parse markdown table lines and add to doc"""
        if len(table_lines) < 2:
            return
        # Parse header
        headers = [c.strip() for c in table_lines[0].strip('|').split('|')]
        # Skip separator line (line 1)
        rows = []
        for line in table_lines[2:]:
            cells = [c.strip() for c in line.strip('|').split('|')]
            rows.append(cells)

        ncols = len(headers)
        table = doc.add_table(rows=1 + len(rows), cols=ncols)
        table.style = 'Table Grid'

        # Header row
        for i, h in enumerate(headers):
            cell = table.rows[0].cells[i]
            cell.text = ''
            p = cell.paragraphs[0]
            run = p.add_run(h)
            set_run_font(run, 10, True, '\u4eff\u5b8b')
            shade_cell(cell, 'D5E8F0')

        # Data rows
        for r_idx, row in enumerate(rows):
            for c_idx in range(min(ncols, len(row))):
                val = row[c_idx]
                cell = table.rows[r_idx + 1].cells[c_idx]
                cell.text = ''
                p = cell.paragraphs[0]
                # Handle **bold** in table cells
                parts = re.split(r'(\*\*.*?\*\*)', val)
                for part in parts:
                    if part.startswith('**') and part.endswith('**'):
                        run = p.add_run(part[2:-2])
                        set_run_font(run, 10, True, '\u4eff\u5b8b')
                    else:
                        run = p.add_run(part)
                        set_run_font(run, 10, False, '\u4eff\u5b8b')
        return table

    def add_bullet(text, bullet='\u2022'):
        """Add bullet point paragraph"""
        p = doc.add_paragraph()
        parts = re.split(r'(\*\*.*?\*\*)', text)
        run0 = p.add_run(bullet + ' ')
        set_run_font(run0, 12, False, '\u4eff\u5b8b')
        for part in parts:
            if part.startswith('**') and part.endswith('**'):
                run = p.add_run(part[2:-2])
                set_run_font(run, 12, True, '\u4eff\u5b8b')
            else:
                run = p.add_run(part)
                set_run_font(run, 12, False, '\u4eff\u5b8b')
        return p

    # ===================== PARSE AND RENDER =====================
    lines = md_text.split('\n')
    i = 0
    in_table = False
    table_lines = []

    while i < len(lines):
        line = lines[i]

        # Handle tables
        if '|' in line and line.strip().startswith('|'):
            if not in_table:
                in_table = True
                table_lines = []
            table_lines.append(line)
            i += 1
            continue
        else:
            if in_table:
                add_table_from_md(table_lines)
                in_table = False
                table_lines = []

        stripped = line.strip()

        # Skip empty lines
        if not stripped:
            i += 1
            continue

        # Horizontal rule
        if stripped == '---':
            i += 1
            continue

        # Headings
        if stripped.startswith('#'):
            level = len(stripped) - len(stripped.lstrip('#'))
            text = stripped.lstrip('#').strip()
            # Map md heading levels to doc levels
            # ## -> level 1, ### -> level 2, #### -> level 3, etc.
            doc_level = max(0, level - 2)
            add_heading(text, doc_level)
            i += 1
            continue

        # Bullet points
        if stripped.startswith('- ') or stripped.startswith('* '):
            text = stripped[2:]
            add_bullet(text, '\u2022')
            i += 1
            continue

        # Numbered items (like "1. xxx")
        num_match = re.match(r'^(\d+)\.\s+(.*)', stripped)
        if num_match:
            text = num_match.group(2)
            p = doc.add_paragraph()
            num_run = p.add_run(num_match.group(1) + '. ')
            set_run_font(num_run, 12, False, '\u4eff\u5b8b')
            parts = re.split(r'(\*\*.*?\*\*)', text)
            for part in parts:
                if part.startswith('**') and part.endswith('**'):
                    run = p.add_run(part[2:-2])
                    set_run_font(run, 12, True, '\u4eff\u5b8b')
                else:
                    run = p.add_run(part)
                    set_run_font(run, 12, False, '\u4eff\u5b8b')
            i += 1
            continue

        # Regular paragraph
        add_body_with_bold(stripped)
        i += 1

    # Flush remaining table
    if in_table:
        add_table_from_md(table_lines)

    # Footer
    doc.add_paragraph()
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    run = p.add_run('申报单位：南网综合能源股份有限公司')
    set_run_font(run, 12, False, '\u4eff\u5b8b')

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    run = p.add_run('申报日期：2026年6月')
    set_run_font(run, 12, False, '\u4eff\u5b8b')

    doc.save(out_path)
    print(f'Saved: {out_path}')

if __name__ == '__main__':
    build()
