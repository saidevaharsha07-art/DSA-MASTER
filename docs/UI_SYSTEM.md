# DSA Master UI System

This document outlines the UI architecture and primitive components that make up the DSA Master Roadmap application.
The UI is strictly token-driven, leveraging Radix UI for accessibility and behavior, and a custom inline/global CSS design system for aesthetics.

## Design Foundations

All UI components and layouts must import from `src/design/`:
- `colors.ts`: Semantic and raw color palette.
- `typography.ts`: Font families, sizes, weights.
- `spacing.ts`: Padding and margins.
- `radius.ts`: Border radii.
- `shadows.ts`: Box shadows.
- `motion.ts`: Framer Motion variants.
- `zindex.ts`: z-index hierarchy.

**Rule**: Never hardcode values like `padding: 18px`. Always use `spacing.lg`.

## Primitives (`src/components/ui/`)

### `Button`
The primary action element.
- **Props**: `variant` ('primary' | 'ghost' | 'outline' | 'danger'), `size` ('sm' | 'md' | 'lg').
- **Accessibility**: Standard `<button>` behavior. ForwardRef enabled.

### `Card`
A versatile container for content.
- **Props**: `padding` (keyof spacing), `interactive` (boolean).
- **Accessibility**: Standard `<div>`. If `interactive`, provides cursor feedback.

### `Badge`
A small pill-shaped indicator.
- **Props**: `variant` ('easy' | 'medium' | 'hard' | 'default' | 'outline').
- **Accessibility**: Used for visual status, not interactive.

### `Divider`
A horizontal or vertical rule.
- **Props**: `orientation` ('horizontal' | 'vertical').

### `ProgressRing`
A circular progress indicator (SVG).
- **Props**: `progress` (0-100), `size` (number), `strokeWidth` (number), `color` (string), `showLabel` (boolean).

### `Panel`
A container similar to Card but often used for sidebars and rigid structural blocks.
- **Props**: `padding`, `withHeader`, `title`, `headerAction`.

### `ResizablePanel` (react-resizable-panels)
Provides VS Code style split panes.
- **Components**: `ResizableWorkspace`, `ResizablePane`, `ResizableDivider`.

### Interactive Primitives (Radix Powered)

- **`Modal`**: A dialog overlay. Manages focus and trap.
- **`Tooltip`**: A floating label for icon buttons.
- **`Popover`**: A floating contextual panel.

## Layouts (`src/components/layouts/`)
- `DashboardLayout`: A flexible 3-column grid for the dashboard.
- `WorkspaceLayout`: The standard layout for practice/arena screens, powered by `ResizableWorkspace`.

## Themes
The application supports Light, Dark, OLED, and High Contrast. These are managed via CSS variables in `:root` and `.dark`/`.oled`/`.high-contrast` classes in `globals.css`.
The Design Tokens (`colors.ts`) automatically map to these CSS variables (`var(--primary)`).

## Motion System
All animations are centralized in `src/core/motion/`.
- `fade`, `slide`, `scale`, `drawer`, `page`, `cards`, `journey`, `workspace`.

## Icons
Centralized via `src/design/icons.ts`, currently using `lucide-react`. Do not mix multiple icon sets.
