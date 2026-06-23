---
trigger: glob
globs: src/components/**/*.tsx
---

- Use named exports, not default exports
- Co-locate styles in a CSS module next to the component (`Foo.module.css`)
- Keep components under 200 lines; extract subcomponents into the same directory
- Prefer composition over prop drilling — pass children or render props
- All event handler props named `onX` (`onClick`, `onChange`)
- No direct DOM manipulation — use React refs only when unavoidable
