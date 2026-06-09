---
name: imag2-ppt-wangzhuo
description: Use when creating a PowerPoint deck from a reference PPT using image2/image generation, full-slide image pages, outline confirmation, template shell pages, batch generation, and image-only PPT assembly.
---

# imag2-ppt-wangzhuo

## Core Contract

This skill produces PPT decks where each body slide is a single full-slide generated image. Do not add PPT-native text boxes, labels, charts, or rescue overlays on body slides after image generation.

Inputs:
- Reference PPTX: provides cover, closing slide, body-page shell, brand chrome, ratio, and visual system.
- User prompt/materials: provides topic, audience, required sections, page count, and content facts.

Outputs:
- Final PPTX.
- Markdown audit pack: outline, page prompts, image manifest, assembly notes.
- In audit/test mode, also keep generated PNGs and the exact assembly scripts used.

Development state:
- During testing, keep this skill as a folder package and do not install it into the active skills directory.
- Release only after the user has reviewed the outline, generated images, final PPTX, and assembly scripts on a real deck.

## Default Workflow

1. **Reference read**
   - Inspect the reference PPTX with `scripts/audit_pptx.py`.
   - Treat slide 1 as cover and the final slide as closing slide unless the user says otherwise.
   - Preserve cover chrome except the title/topic when the user asks for a new topic.
   - Preserve the closing slide unchanged by default.
   - Identify the body-page empty shell: header, logo, white content panel, borders, and other brand furniture after manually inserted content is removed.

2. **Outline planning**
   - Produce a Markdown outline before image generation.
   - For each body page include:
     - `page_no`
     - `title`
     - `opening_sentence`: highly condensed, normally two lines at most
     - `page_content`: only the concise text that must appear in the generated image
     - `visual_description`: what the page should visually show
     - `image2_prompt`: full prompt for the page image
   - Make the outline professional and substantive. Avoid vague module names without business meaning.
   - Stop for user confirmation at this stage unless the user explicitly asked to run end-to-end.

3. **Batch image generation**
   - Generate all body pages as full-slide images, one image per body slide.
   - Use the reference body shell as the visual basis: the generated image should feel like content has been drawn naturally into that shell.
   - All title, opening sentence, explanations, charts, numbers, icons, and diagrams that appear on the body page must be in the generated image itself.
   - Keep Chinese text concise and large. If a page requires detail, prefer structured cards, short phrases, and numeric highlights.

4. **Assembly**
   - Use `scripts/assemble_image_deck.py`.
   - Body slides are cleared, then exactly one full-slide PNG is inserted per body slide.
   - No body-slide overlays are added after the image is inserted.
   - Cover and final slide are preserved unless the user explicitly asks to regenerate them.
   - If `--cover-title` is used, the replacement cover title is forced to white bold text to match dark cover templates.

5. **Audit and delivery**
   - Run `scripts/audit_pptx.py` on the final PPTX.
   - Deliver the final PPTX and Markdown.
   - In audit/test mode, provide paths to: outline Markdown, page images, final PPTX, assembly script, and audit Markdown.

## Hard Rules

- Body slides are image-only: one full-slide PNG per slide.
- Do not fix image text with PPT text overlays. Regenerate the image instead.
- Do not replace the reference template with a generic blue-white deck. The shell and brand chrome must come from the reference PPT.
- Do not invent precise facts, policy names, financial results, or measured data. Mark estimates as estimates and use conservative wording.
- Do not skip outline confirmation unless the user explicitly asks for end-to-end generation.
- If image generation produces unusable Chinese text, regenerate with fewer words and larger type.
- Keep final image prompts free of internal filenames, slide IDs, batch labels, or audit metadata.

## Body Page Prompt Pattern

Use this compact structure for each page prompt:

```text
Create a finished 16:9 Chinese corporate PowerPoint slide using the provided reference PPT shell.
Preserve the template family: header streak, logo, white rounded panel, brand color, and professional enterprise style.

Slide title: <title>
Opening sentence: <two-line sentence>

Main visual:
<diagram/layout instructions>

Text to include:
<short exact labels and numeric items only>

Style constraints:
Full-slide image, integrated design, readable Chinese, large concise text, no fake English,
no gibberish, no watermark, no post-generation overlay placeholders.
```

## Script Usage

Inspect a reference or output PPTX:

```bash
python scripts/audit_pptx.py --pptx reference.pptx --out audit.md
```

Assemble generated body images into a reference PPT:

```bash
python scripts/assemble_image_deck.py \
  --reference-pptx reference.pptx \
  --images-dir generated_pages \
  --out-pptx final.pptx \
  --audit-markdown assembly_audit.md
```

Optional cover title replacement:

```bash
python scripts/assemble_image_deck.py \
  --reference-pptx reference.pptx \
  --images-dir generated_pages \
  --out-pptx final.pptx \
  --cover-title "新PPT题目" \
  --audit-markdown assembly_audit.md
```

Images must be named in slide order, for example `slide_02.png`, `slide_03.png`, or any lexicographically sorted body-page sequence. The image count must equal the number of body slides.

## Markdown Audit Pack

Create one Markdown file with these sections:

```md
# Image2 PPT Audit

## Inputs
- reference_pptx:
- user_prompt:
- page_count:

## Outline
| page | title | opening_sentence | visual_description |

## Image Prompts
### Page 02
...

## Generated Images
| page | image_path | status |

## Assembly
- final_pptx:
- assembly_script:
- body_slide_policy: one full-slide image per slide, no overlays

## Open Issues
- items needing user review or regeneration
```
