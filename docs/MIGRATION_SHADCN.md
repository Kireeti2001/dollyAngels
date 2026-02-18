# Migration to Tailwind + shadcn-style UI

## Summary

- **Chakra UI** and **MUI** have been removed. The app now uses **Tailwind CSS** for styling and **Radix UI** primitives with Tailwind (shadcn-style) for components.
- **Entry point**: `src/main.jsx` (referenced in `index.html`). `src/index.js` is legacy and not used.

## What was added

- **Tailwind CSS** (`tailwind.config.js`, `postcss.config.js`) with `darkMode: "class"` and custom theme (CSS variables, `--primary`, `--background`, etc.).
- **Global CSS** (`src/assets/styles/global.css`): Tailwind directives + `:root` / `.dark` variables.
- **lib/utils.js**: `cn()` helper (clsx + tailwind-merge).
- **UI components** (in `src/components/ui/`):
  - `button.jsx` – variants: default, destructive, outline, secondary, ghost, link; sizes: default, sm, lg, icon.
  - `input.jsx`, `textarea.jsx`, `label.jsx` (Radix Label).
  - `card.jsx` – Card, CardHeader, CardTitle, CardContent.
  - `dialog.jsx` – Dialog, DialogContent, DialogOverlay, etc. (Radix Dialog).
  - `sheet.jsx` – Sheet (drawer) built on Radix Dialog; used for mobile nav.
- **Contexts**:
  - `ThemeContext.jsx` – `ThemeProvider`, `useTheme()`, `toggleTheme()`; persists to `localStorage` and sets `document.documentElement.classList` to `"light"` or `"dark"`.
  - `ToastContext.jsx` – `ToastProvider`, `useToast()` with `showToast({ title, description, status })`; renders a fixed toast.
- **Hook**: `useMediaQuery.js` – for responsive behavior (e.g. mobile nav, particles).

## What was removed

- All `@chakra-ui/*` and `@emotion/*` packages.
- `@mui/material` and `@mui/icons-material`.
- `src/theme.js` (Chakra theme).

## How to run

```bash
npm install
npm run dev
```

If `npm run build` fails with `@rollup/rollup-linux-x64-gnu` not found, try:

```bash
rm -rf node_modules package-lock.json && npm install && npm run build
```

## Theming

- Light/dark is controlled by `ThemeProvider` and the `dark` class on `<html>`.
- Colors use CSS variables in `global.css` (`:root` and `.dark`). Tailwind theme extends with `primary`, `background`, `card`, `muted`, etc., mapping to `hsl(var(--primary))` and similar.
- Use Tailwind classes: `bg-primary`, `text-muted-foreground`, `border-border`, `dark:bg-card`, etc.

## Adding more shadcn-style components

1. Install the Radix primitive (e.g. `@radix-ui/react-dropdown-menu`).
2. Create `src/components/ui/dropdown-menu.jsx` (or similar) using Radix + Tailwind classes and `cn()`.
3. Follow the same pattern as existing components (forwardRef, displayName, variants with cva if needed).
