# Kosha <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 40px"/>

[![Test Status](https://github.com/react18-tools/kosha/actions/workflows/test.yml/badge.svg)](https://github.com/react18-tools/kosha/actions/workflows/test.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/55202c8c7bee2d7a95bd/maintainability)](https://codeclimate.com/github/react18-tools/kosha/maintainability)
[![Code Coverage](https://codecov.io/gh/react18-tools/kosha/graph/badge.svg)](https://codecov.io/gh/react18-tools/kosha)
[![Version](https://img.shields.io/npm/v/kosha.svg?colorB=green)](https://www.npmjs.com/package/kosha)
[![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/kosha.svg)](https://www.npmjs.com/package/kosha)
![Bundle Size](https://img.shields.io/bundlephobia/minzip/kosha)
[![Gitpod Ready](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

> **_⚡Kosha_**: **A Modern, Lightweight, and High-Performance State Management Library for React**

**Kosha** is a production-ready, minimalistic global state management solution for modern React applications. At just **\~450 bytes minzipped**, it's optimized for performance-critical applications, full React 18+ support, and clean developer ergonomics.

Live demo: [https://kosha-six.vercel.app](https://kosha-six.vercel.app)

---

## 📚 Table of Contents

- [🚀 Features](#-features)
- [📦 Installation](#-installation)
- [🧑‍💻 Usage](#-usage)
- [🧰 Immer Middleware](#-immer-middleware)
- [⚖️ Zustand Comparison](#️-why-choose-kosha-over-zustand)
- [📁 Examples](#-examples)
- [❓ FAQ](#-faq)
- [🚧 Known Limitations](#-known-limitations)
- [🤝 Contributing](#-contributing)
- [🧪 Testing and Mocking](#-testing-and-mocking)
- [🧠 Internals & Caveats](#-internals--caveats)
- [📜 License](#-license)

---

## 🚀 Features

1. **Ultra-Lightweight**

   - Minzipped size: **\~420–460 bytes**, ideal for bundle-sensitive projects.

2. **Optimized by Default: Zero Unnecessary Re-renders**

   - Uses `useSyncExternalStore` for subscription handling and memoization.
   - No need to manually optimize with `shallow` equality — Kosha uses `JSON.stringify` internally to compare selector outputs.

3. **Partial State Updates**

   - Update only what you need without spreading old state:

     ```tsx
     set({ count });
     set(state => ({ count: state.count + 1 }));
     ```

4. **Concurrent Rendering Ready**

   - Fully supports React 18+ and concurrent features.

5. **Flexible Consumption API**

   - Consume whole store or optimized slices via selectors.

     ```tsx
     const count = useKosha(state => state.count); // optimized - re-renders only when count changes
     const { count, setCount } = useKosha(); // re-renders for every state change
     ```

6. **Middleware Architecture (BYO Middleware)**

   - Middleware support is built-in. While Kosha doesn’t yet include a plugin ecosystem like Zustand, you can define and compose custom middlewares easily.
   - Includes working [persist middleware](https://github.com/mayank1513/kosha/blob/main/lib/src/middleware/persist.ts) example out-of-the-box

---

## 📦 Installation

Install using your preferred package manager:

```bash
pnpm add kosha
```

**_or_**

```bash
npm install kosha
```

**_or_**

```bash
yarn add kosha
```

---

## 🧑‍💻 Usage

### 1. Create a Store

```tsx
import { create } from "kosha";

const useKosha = create(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
}));
```

### 2. Consume the Store (Full Access)

```tsx
const { count, increment } = useKosha();
```

> This will trigger re-render even when count or increment are not changed but other states [part of the same store] change.

### 3. Select Specific State

```tsx
const count = useKosha(state => state.count);
const increment = useKosha(state => state.increment);

// or use shorthand
const { count, increment } = useKosha(({ count, increment }) => ({ count, increment }));
```

### 4. Update Outside React

```ts
useKosha.getState().increment();
```

## ⚠️ Avoid In-Place Mutations

Kosha detects changes using shallow comparison (`JSON.stringify`) between the **previous and new result of the selector**.
If you mutate state **in-place** and return the same object reference, **listeners will not be triggered**, and your UI will not re-render — even though the state has technically changed.

### 🔴 Problem Example

```ts
create(set => ({
  todos: [],
  addTodo: item =>
    set(state => {
      state.todos.push(item); // ❌ in-place mutation
      return state; // same reference!
    }),
}));
```

### ✅ Correct Way – Return a New Object

```ts
create(set => ({
  todos: [],
  addTodo: item =>
    set(state => ({
      ...state,
      todos: [...state.todos, item], // ✅ returns a new object
    })),
}));
```

### ✅ Even Better – Use Immer

```ts
import { produce } from "immer";

create(set => ({
  todos: [],
  addTodo: item =>
    set(
      produce(state => {
        state.todos.push(item);
      }),
    ),
}));
```

> ℹ️ Kosha does not bundle `immer` by default, but you can use it safely with your own setup or use immer middleware.

---

## 🧰 Immer Middleware

Kosha provides a convenient **immer middleware** to simplify immutable state updates by enabling you to write mutative logic inside the store setter. It internally applies `immer`'s `produce` function automatically.

Example usage:

```ts
import { create } from "kosha";
import { immer } from "kosha/middleware";

const useKosha = create(
  immer(set => ({
    todos: [],
    addTodo: (item: string) =>
      set(state => {
        state.todos.push(item); // safe mutable update with immer middleware
      }),
  })),
);
```

This middleware allows you to write concise, mutable-looking update code while keeping the state immutable under the hood.

You can combine `immer` middleware with other middlewares like `persist` for powerful state management.

---

## ⚖️ Why Choose Kosha Over Zustand?

| Feature             | Kosha                     | Zustand                           |
| ------------------- | ------------------------- | --------------------------------- |
| Size (minzipped)    | \~450 bytes               | \~0.6–2.5kB+ (depending on usage) |
| Optimized Selectors | ✅ Built-in via stringify | ⚠️ Manual / shallow equality      |
| Partial Updates     | ✅                        | ✅                                |
| Middleware Support  | ✅ (custom)               | ✅ (rich plugin ecosystem)        |
| Devtools            | ❌ (custom only)          | ✅                                |
| Plugin Ecosystem    | 🚧 (in development)       | ✅                                |

Kosha is perfect for apps that prioritize bundle size, simplicity, and predictable updates without the need for extensive tooling.

---

## 📁 Examples

Explore the [`examples/`](https://github.com/react18-tools/kosha/tree/main/examples) directory for working codebases, including component and selector examples.

---

## ❓ FAQ

### 1. Is Kosha production-ready?

Yes. Kosha is small, stable, and well-tested.

### 2. Does Kosha support async logic?

Absolutely. Define `async` functions inside the store:

```tsx
const useStore = create(set => ({
  fetchUser: async () => {
    const user = await fetch("/api/user").then(res => res.json());
    set({ user });
  },
}));
```

### 3. Does Kosha support middleware like Zustand?

Yes. Middleware support is built-in. A working persist middleware is included. You can easily build your own or extend with logging, devtools, etc.

### 4. My state updates, but components don’t re-render. Why?

You might be mutating the existing state object **in-place** instead of returning a new one. Kosha relies on reference comparison (`JSON.stringify`) to detect changes. Always return a new object, or use libraries like **immer** or the **immer middleware** from `kosha/middleware` to handle immutable updates safely.

### 5. Can I use it with `Set`, `Map`, or `Date` objects?

While `Date` serializes fine, **avoid storing `Set` or `Map`** directly in global state, since Kosha uses `JSON.stringify` to diff selector outputs. Use arrays or plain objects instead for best results.

### 6. Isn’t JSON.stringify unreliable because key order might change?

No — in Kosha, you’re comparing outputs of the same selector function across renders. Since the order of keys in JavaScript objects is preserved in deterministic function outputs, JSON.stringify remains stable and reliable in this context.

---

## 🚧 Known Limitations

Kosha is intentionally minimal by design — built to offer just what most React apps need, without bloat. That comes with a few tradeoffs:

### 🧠 Selector Comparison via `JSON.stringify`

Kosha uses `JSON.stringify` internally to compare selector outputs for change detection. This works extremely well for the majority of cases — even with moderately large or deeply nested selectors.

However, there are a few caveats:

- **Avoid non-serializable values** in selectors like `Set`, `Map`, `WeakMap`, or circular objects.
- **Very large selector outputs** may incur performance costs during diffing.

> To clarify:
> ✅ It’s perfectly fine to have a large store or global state.
> ⚠️ What matters is the **output of your selector**. If you’re selecting a large slice like `state => ({ a: state.a, ..., z: state.z })`, it’s more efficient to either:
>
> - Access the store directly without a selector (`useKosha()`), or
> - Extract only the minimal fields you actually need.

### 🔌 Plugin Ecosystem Still Growing

Kosha includes full support for custom middleware and already ships with a working [persist middleware](https://github.com/mayank1513/kosha/blob/main/lib/src/middleware/persist.ts). However:

- Built-in plugins like `devtools` are not yet included.
- A community-driven plugin ecosystem is still in its early stages.

> That said, the underlying architecture is solid and middleware-ready — you're free to build and compose your own middleware as needed.

---

## 🤝 Contributing

We welcome contributions!

- 💬 Start a [discussion](https://github.com/react18-tools/kosha/discussions)
- 🐛 Report bugs on the [issue tracker](https://github.com/react18-tools/kosha/issues)
- 🧪 Submit PRs to improve or extend Kosha

Got an idea for a middleware plugin or improvement? We'd love to collaborate.

---

## 🧪 Testing and Mocking

Kosha exposes setState, allowing you to inject test data directly.
Resettable Test Stores

For advanced test isolation, you can register and reset stores:

```tsx
import { act } from "react-dom/test-utils";
import { afterEach } from "jest";
import { create } from "kosha";
import type { StoreCreator, BaseType } from "kosha";

export const storeResetFns = new Set<() => void>();

// use createTestStore for mocking up store in your test cases
export const createTestStore = <T extends BaseType>(creator: StoreCreator<T>) => {
  const useStore = create(creator);
  const initial = useStore.getState();
  storeResetFns.add(() => useStore.setState(initial!, true));
  return useStore;
};

afterEach(() => {
  act(() => storeResetFns.forEach(resetFn => resetFn()));
});
```

Use this pattern to reset stores automatically before each test.

## 🧠 Internals & Caveats

### 🔍 Why use `JSON.stringify` for selector comparison?

Kosha compares previous and next selector outputs using `JSON.stringify` to prevent unnecessary re-renders. This approach has several benefits:

- It's **fast** and works for most serializable primitives and plain objects.
- It ensures **deep comparison** out-of-the-box without manual equality functions.

### ⚠️ What about key order in objects?

This is a common concern, but not an issue in Kosha:

> Kosha always compares results of the **same selector function**, so the key order is preserved unless your selector behaves non-deterministically (e.g., relies on `Object.keys()` or mutation).
> As long as your selector returns a consistent structure, `JSON.stringify` comparison will be reliable.

---

## 📜 License

Kosha is licensed under the **MPL-2.0** license.

<img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 20px"/> Explore [my courses](https://mayank-chaudhari.vercel.app/courses) or [support development](https://github.com/sponsors/mayank1513).

---

<p align="center" style="text-align:center">Built with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
