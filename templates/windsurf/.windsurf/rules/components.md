---
trigger: glob
globs: src/components/**/*.tsx
---

<!-- TIP 3 — Coding Guidelines (scoped): trigger: glob means this rule only loads when
     Windsurf is working on component files. Component-specific conventions don't need to be
     in context during API or service layer work — scoping prevents context bloat and keeps
     rules relevant to the file being edited. -->

- Use named exports, not default exports
- Co-locate styles in a CSS module next to the component (`Foo.module.css`)
- Keep components under 200 lines; extract subcomponents into the same directory
- Prefer composition over prop drilling — pass children or render props
- All event handler props named `onX` (`onClick`, `onChange`)
- No direct DOM manipulation — use React refs only when unavoidable
