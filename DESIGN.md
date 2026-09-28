# DESIGN.md

Design system for the todo app. **Read this file before writing or changing any UI.**
If a decision is not covered here, choose the option that is quieter, with more whitespace and fewer elements.

## Concept

A todo list set like a page from a printed journal. Warm paper, black ink, one red accent, and a lot of empty space. The interface should feel read, not operated. Typography does the work that boxes, shadows, and icons usually do.

**Keywords:** editorial, quiet, typographic, paper, ink, hairline.

## Rules that never break

1. One accent color (`--accent`), used only for: the completed-task strike line, the focus ring, and the Add button hover. Nowhere else.
2. No shadows, no gradients, no rounded corners larger than 2px, no emoji, no icon libraries.
3. Structure comes from hairline rules (1px) and whitespace, never from filled boxes or cards.
4. Two type families only: a serif for display, a sans for everything else. Mono for small metadata.
5. One column, centered, max width 640px.

## Color tokens

Define these as CSS variables on `:root`. Never hardcode hex values in components.

```css
:root {
  --paper: #f5f2eb; /* page background */
  --ink: #171614; /* primary text */
  --ink-soft: #6b675f; /* secondary text, placeholders, metadata */
  --ink-faint: #b9b4a8; /* completed task text */
  --rule: #d9d4c7; /* hairlines */
  --accent: #d63e1c; /* vermilion, used sparingly (see rules) */
}

@media (prefers-color-scheme: dark) {
  :root {
    --paper: #151412;
    --ink: #efebe2;
    --ink-soft: #97928670;
    --ink-faint: #5c5850;
    --rule: #2c2a26;
    --accent: #ff6a45;
  }
}
```

Body background is `--paper`. Text is `--ink`. Contrast of `--ink` on `--paper` must stay above 7:1.

## Typography

Load from Google Fonts in `index.html` (no npm dependency needed):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400&display=swap"
  rel="stylesheet"
/>
```

| Role                   | Family          | Size                          | Weight | Notes                                    |
| ---------------------- | --------------- | ----------------------------- | ------ | ---------------------------------------- |
| Masthead title         | Fraunces        | `clamp(3.5rem, 12vw, 6.5rem)` | 300    | line-height 0.95, letter-spacing -0.03em |
| Masthead italic word   | Fraunces italic | same                          | 300    | one word only, e.g. "_today_"            |
| Task text              | Inter           | 1.125rem                      | 400    | line-height 1.5                          |
| Task number            | JetBrains Mono  | 0.75rem                       | 400    | tabular numbers, `--ink-soft`            |
| Metadata (date, count) | JetBrains Mono  | 0.75rem                       | 400    | uppercase, letter-spacing 0.12em         |
| Input                  | Fraunces italic | 1.5rem                        | 300    | placeholder in `--ink-soft`              |
| Buttons                | Inter           | 0.8125rem                     | 500    | uppercase, letter-spacing 0.1em          |

Fallbacks: `Georgia, serif` for Fraunces, `system-ui, sans-serif` for Inter, `ui-monospace, monospace` for JetBrains Mono.

## Layout and spacing

- Page: `max-width: 640px`, centered, horizontal padding `24px`, top padding `12vh`, bottom padding `96px`.
- Spacing scale (use only these): `4, 8, 16, 24, 40, 64, 96`.
- Masthead sits above a full-width 1px rule, with `40px` below it.
- Each task row: padding `16px 0`, separated by a 1px `--rule` bottom border. No border on the last row.
- Mobile: same layout, tighter top padding (`8vh`). Tap targets are at least 44px tall.

## Page structure (top to bottom)

1. **Meta line**: today's date on the left (`TUESDAY, 28 SEPTEMBER`), open-task count on the right (`3 OPEN`). Mono, uppercase, `--ink-soft`.
2. **Masthead**: the words "Things to do _today_" in Fraunces. Only "today" is italic.
3. **Rule**: 1px `--rule`.
4. **Add field**: one line, described below.
5. **Task list**: numbered rows.
6. **Footer**: a rule, then a mono line such as `2 DONE · CLEAR COMPLETED`. "Clear completed" is a text button and only appears when at least one task is done.

## Components

### Add field

- A single input with no box: only a 1px bottom border in `--rule`, padding `16px 0`.
- Fraunces italic, 1.5rem, placeholder text: `Write something down…`
- The Add button sits at the right end of the same line as text only: `ADD →`, uppercase, Inter 500. No background, no border.
- Pressing Enter submits. Empty input is ignored.
- Focus: the bottom border becomes `--ink` (1px to 2px). No glow, no outline box. Keyboard focus on the button uses a 2px `--accent` underline.

### Task row

- Grid: `[number 40px] [text 1fr] [delete auto]`.
- Number: zero-padded (`01`, `02`), mono, `--ink-soft`.
- Text: Inter 1.125rem, `--ink`.
- Delete: appears as `×` at the right, `--ink-soft`, opacity 0 on desktop until the row is hovered or focused. Always visible on touch devices.
- Row hover: no background change. Only the delete button appears.

### Checkbox (custom)

- Sits to the left of the text, after the number: a 18px square with a 1px `--ink` border, no radius.
- Checked: the square fills with `--ink` and shows a small `--paper` check drawn with two lines (no icon library).
- Use a real `<input type="checkbox">` visually restyled, so keyboard and screen readers work.

### Completed task

- Text color becomes `--ink-faint`.
- A 1.5px `--accent` line draws through the text from left to right (see Motion). Implement with a pseudo-element, not `text-decoration`.
- The number stays `--ink-soft`.

### Empty state

- No illustration. A single line in Fraunces italic, `--ink-soft`, centered under the field: `Nothing yet. A clear page.`

### Buttons

- Text-only. Uppercase, letter-spacing 0.1em. Hover changes color to `--accent`. No backgrounds, borders, or shadows.

## Motion

Keep it slow, calm, and small. Everything respects `prefers-reduced-motion: reduce` (disable all of it).

| Interaction         | Effect                                                              | Duration | Easing                           |
| ------------------- | ------------------------------------------------------------------- | -------- | -------------------------------- |
| Task added          | Fades in and moves up 8px                                           | 320ms    | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Task completed      | Accent strike line draws left to right, text fades to `--ink-faint` | 280ms    | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Task deleted        | Fades out and height collapses                                      | 240ms    | `ease-out`                       |
| Hover color changes | Color transition                                                    | 150ms    | `ease`                           |
| Page load           | Masthead fades in, then rows stagger in (40ms apart)                | 500ms    | `cubic-bezier(0.22, 1, 0.36, 1)` |

## Accessibility

- All interactive elements are reachable by keyboard with a visible focus state (2px `--accent`).
- Delete buttons have `aria-label="Delete task: {text}"`.
- The task list is a `<ul>`; the count in the meta line uses `aria-live="polite"`.
- Never rely on color alone for completed state: the strike line and checked box both show it.
- Body text never goes below 16px.

## Do

- Let the masthead be huge and the rest small. The contrast in scale is the design.
- Use generous vertical space between elements.
- Align everything to the left edge of the column.
- Keep copy short, calm, and lowercase-friendly.

## Don't

- Don't add cards, drop shadows, gradients, or colored backgrounds.
- Don't use more than one accent color or use the accent for decoration.
- Don't add icons, illustrations, or emoji.
- Don't use bold heavier than 500 anywhere.
- Don't center-align task text.
- Don't add new fonts, colors, or spacing values without updating this file first.

## Implementation notes

- Put the tokens in `src/index.css` and use plain CSS (or CSS modules). Do not add a CSS framework or component library.
- Build the components above in `src/components/`, one file per component: `AddField`, `TaskRow`, `Masthead`, `Footer`.
- After any UI change, check the result against the "Rules that never break" section before marking the task done.
