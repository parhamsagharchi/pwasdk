# Code Style Guide — pwasdk

Standards for:

- `packages/core` → `@pwasdk/core` (published SDK)
- `apps/playground` → React demo

**Influences:** [Airbnb JS](https://github.com/airbnb/javascript) · [three.js](https://github.com/mrdoob/three.js/) · [JS/React patterns](https://github.com/lydiahallie/javascript-react-patterns/tree/main/pages/patterns)

---

## 1. Principles

- One feature = one folder; one concern = one suffix file
- Colocate first; promote to shared folders only after real reuse
- Core is browser-only, side-effect free on import, no secrets, no `console.*`
- Prefer consistency over cleverness

---

## 2. Repository layout

```
pwasdk/
├── packages/core/src/
│   ├── index.ts              # public barrel
│   ├── types/                # shared (2+ modules)
│   ├── constants/
│   ├── utils/
│   └── modules/[feature]/
└── apps/playground/src/
    ├── components/[feature]/
    ├── pages/
    ├── hooks/                # shared (3+ usages)
    ├── utils/                # shared (2+ usages)
    ├── types/
    ├── constants/
    ├── service/
    ├── apis/                 # when needed
    ├── store/                # when needed
    ├── App.tsx
    └── main.tsx
```

- Publishable logic → `packages/core` only
- React / demo UI → `apps/playground` only
- Consumers import SDK from `@pwasdk/core` (no deep imports)

---

## 3. File suffixes (core + playground)

```
[feature].[suffix].ts(x)
```

| Suffix | Use |
|--------|-----|
| *(main)* | Implementation / component — `geolocation.ts`, `sample-panel.tsx` |
| `.types` | Interfaces & type aliases |
| `.enum` | Enums |
| `.constants` | Constants |
| `.utils` | Pure helpers |
| `.hooks` | React hooks (playground) |
| `.apis` / `.queries` | Remote API layer (playground, when needed) |
| `.view` | Optional pure UI extract |
| `.module.css` | Styles |
| `.test` | Tests |
| `index.ts(x)` | Barrel only — no logic |

**Rules**

- Always include the feature prefix: `geolocation.types.ts` ✅ · `types.ts` ❌
- Add a suffix file only when needed (no empty placeholders)
- **No `.wrap.tsx`** — logic lives in the main file and/or `.hooks.ts`

```
modules/geolocation/
├── index.ts
├── geolocation.ts
├── geolocation.types.ts
├── geolocation.enum.ts        # optional
├── geolocation.constants.ts   # optional
├── geolocation.utils.ts       # optional
└── geolocation.test.ts        # optional
```

---

## 4. Naming

| Kind | Convention | Example |
|------|------------|---------|
| Folder / file prefix | `kebab-case` | `app-storage/`, `sample-panel.hooks.ts` |
| Core namespace | `PascalCase` | `Geolocation`, `AppStorage` |
| React component | `PascalCase` | `SamplePanel` |
| Function / method / hook | `camelCase` | `getCurrent`, `useSamplePanel` |
| Boolean | `is` / `has` / `can` | `isSupported`, `canPrompt` |
| Constant | `UPPER_SNAKE_CASE` | `DEFAULT_SW_PATH` |

### Types — required prefixes

| Kind | Prefix | Example |
|------|--------|---------|
| `interface` | `I` | `export interface IGeoPosition {}` |
| `type` | `T` | `export type TPwaPlatform = "ios" \| "android"` |
| `enum` | `E` | `export enum EGeoPermission {}` |

```ts
// ✅
export interface IGeoPosition { lat: number; lng: number }
export type THapticIntensity = "light" | "medium" | "heavy";
export enum EGeoPermission { Granted = "granted", Denied = "denied" }

// ❌
export interface GeoPosition {}
export type GeoPermission = "granted" | "denied";
export enum GeoPermission {}
```

Do **not** prefix: React components, core namespaces, or DOM lib types (`PositionOptions`).

---

## 5. Core modules (`@pwasdk/core`)

### Shape ([module pattern](https://github.com/lydiahallie/javascript-react-patterns/tree/main/pages/patterns/design-patterns))

```ts
// geolocation.types.ts
export interface IGeoPosition {
  lat: number;
  lng: number;
  accuracy?: number;
}

// geolocation.ts
import type { IGeoPosition } from "./geolocation.types";

export const Geolocation = {
  isSupported(): boolean {
    return typeof navigator !== "undefined" && "geolocation" in navigator;
  },

  getCurrent(options?: PositionOptions): Promise<IGeoPosition> {
    if (!this.isSupported()) {
      return Promise.reject(new Error("Geolocation API is not supported"));
    }
    // ...
  },
};

// index.ts
export { Geolocation } from "./geolocation";
export type { IGeoPosition } from "./geolocation.types";
```

### API rules

| Rule | Detail |
|------|--------|
| Namespace object | `export const Feature = { ... }` — not a class |
| Capability check | `isSupported()`; guard `window` / `navigator` |
| Soft fail | Cancelable / best-effort → `false` / `null` |
| Hard fail | Expected result missing → `throw` / `Promise.reject` |
| Side effects | Opt-in only (`Install.init()`), never at import time |
| Listeners | Return `() => void` unsubscribe ([observer](https://github.com/lydiahallie/javascript-react-patterns/tree/main/pages/patterns/design-patterns)) |
| Module state | Allowed sparingly (`Install` prompt, `WakeLock` sentinel) |
| Factory | OK for nested APIs (`AppStorage.local` / `.session`) |

### Errors

```ts
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  throw new Error(`Failed to subscribe: ${message}`);
}
```

English messages · no secrets in logs · no `console.*` in core.

---

## 6. Playground (React)

### Component folder

```
components/sample-panel/
├── index.ts
├── sample-panel.tsx
├── sample-panel.types.ts
├── sample-panel.hooks.ts      # optional
├── sample-panel.utils.ts      # optional
├── sample-panel.constants.ts  # optional
├── sample-panel.enum.ts       # optional
└── sample-panel.module.css    # optional
```

### Preferred React patterns

From [react-patterns](https://github.com/lydiahallie/javascript-react-patterns/tree/main/pages/patterns/react-patterns):

| Prefer | Avoid |
|--------|-------|
| **Hooks** — logic in `.hooks.ts` | HOCs for new code |
| Component + hooks | `.wrap.tsx` / render-prop wrappers |
| Provider only for real shared app state | Prop-drilling everything *or* context for everything |
| Compound components when UI is a set | Giant prop bags for related sub-UI |

```tsx
// sample-panel.types.ts
export interface ISamplePanelProps {
  title: string;
  onAction?: () => void;
}

// sample-panel.hooks.ts
import { useState } from "react";
import { Haptic } from "@pwasdk/core";

export function useSamplePanel(onAction?: () => void) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = () => {
    if (Haptic.isSupported()) Haptic.trigger("light");
    onAction?.();
  };

  return { isLoading, handleAction };
}

// sample-panel.tsx
import type { ISamplePanelProps } from "./sample-panel.types";
import { useSamplePanel } from "./sample-panel.hooks";

function SamplePanel({ title, onAction }: ISamplePanelProps) {
  const { isLoading, handleAction } = useSamplePanel(onAction);

  return (
    <section>
      <h2>{title}</h2>
      <button type="button" disabled={isLoading} onClick={handleAction}>
        Action
      </button>
    </section>
  );
}

export default SamplePanel;
```

### Performance ([performance-patterns](https://github.com/lydiahallie/javascript-react-patterns/tree/main/pages/patterns/performance-patterns))

- Named imports from `@pwasdk/core` (tree-shaking)
- Dynamic import / route splitting for heavy playground pages when needed
- Keep `App.tsx` as composition root — not a 1000-line dump

### Promotion thresholds

| Code | Stay in feature | Move shared |
|------|-----------------|-------------|
| Hooks | default | `src/hooks/` after **3+** uses |
| Utils | default | `src/utils/` after **2+** uses |
| Types / constants / enums | feature suffix files | `src/types/` etc. when shared |

---

## 7. Language & TypeScript (Airbnb baseline)

- `const` default · `let` when reassigned · never `var`
- `===` / `!==` · template strings · semicolons · trailing commas
- Arrow callbacks · default params · rest (`...args`)
- ESM only · `import type` for types · `unknown` over `any`
- `strict: true` · double quotes (Airbnb amendment) · 2-space indent
- Line length: prefer ≤ 100

```ts
import { Geolocation, type IGeoPosition } from "@pwasdk/core";
```

---

## 8. Security & docs

- HTTPS / localhost for sensitive APIs
- VAPID keys only via consumer env — never in the SDK
- `AppStorage` ≠ secure storage — see [SECURITY.md](./SECURITY.md)
- Short JSDoc on public core APIs; update READMEs on API changes

---

## 9. Do not

| ❌ | ✅ |
|----|----|
| Flat `modules/foo.ts` | `modules/foo/` + suffix files |
| `types.ts` / `interface.ts` without feature prefix | `foo.types.ts` |
| Unprefixed `interface` / `type` / `enum` | `I` / `T` / `E` |
| `.wrap.tsx` | `[name].tsx` + `[name].hooks.ts` |
| Classes as core API | Namespace object |
| `console.*` in core | Typed return / `throw` |
| Secrets in repo | Env / consumer config |
| Side effects at import | `init()` |

---

## 10. PR checklist

- [ ] `[feature].[suffix].*` naming
- [ ] `I*` / `T*` / `E*` on our types
- [ ] Core: namespace + `isSupported()` + no import side effects
- [ ] Playground: no `.wrap.tsx`; SDK via `@pwasdk/core`
- [ ] No secrets · no `console.*` in core
- [ ] `pnpm --filter @pwasdk/core build` passes

---

See also: [CONTRIBUTING.md](./CONTRIBUTING.md) · [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
