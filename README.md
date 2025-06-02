# Kosha <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 40px"/>

[![Test Status](https://github.com/react18-tools/kosha/actions/workflows/test.yml/badge.svg)](https://github.com/react18-tools/kosha/actions/workflows/test.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/55202c8c7bee2d7a95bd/maintainability)](https://codeclimate.com/github/react18-tools/kosha/maintainability)
[![Code Coverage](https://codecov.io/gh/react18-tools/kosha/graph/badge.svg)](https://codecov.io/gh/react18-tools/kosha)
[![Version](https://img.shields.io/npm/v/kosha.svg?colorB=green)](https://www.npmjs.com/package/kosha)
[![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/kosha.svg)](https://www.npmjs.com/package/kosha)
![Bundle Size](https://img.shields.io/bundlephobia/minzip/kosha)
[![Gitpod Ready](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

### **A Modern, Lightweight, and High-Performance State Management Library for React**

**Kosha** is a production-ready, minimalistic global state management solution for modern React applications. Weighing in at just **~450 bytes minzipped**, it’s built for developers who care about performance, clean APIs, and full React 18+ compatibility.

---

## 📚 Table of Contents

- [🚀 Features](#-features)
- [📦 Installation](#-installation)
- [🧑‍💻 Usage](#-usage)
- [⚖️ Zustand Comparison](#️-why-choose-kosha-over-zustand)
- [📁 Examples](#-examples)
- [❓ FAQ](#-faq)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## 🚀 Features

1. **Ultra-Lightweight**
   - Minzipped size: ~**420–571 bytes**, making it ideal for performance-critical applications.

2. **Zero Unnecessary Re-renders**
   - Based on React’s `useSyncExternalStore`, Kosha ensures components only re-render when selected state changes.
   - Example:
     ```tsx
     const count = useKosha(state => state.count);
     ```

3. **Partial State Updates**
   - Update only what you need—no need to manually spread previous state:
     ```tsx
     set({ count });
     set(state => ({ count: state.count + 1 }));
     ```

4. **Flexible Consumption API**
   - Select specific fields or use the entire store:
     ```tsx
     const { count, setCount } = useKosha();
     ```

5. **Concurrent Rendering Ready**
   - Fully compatible with React 18+ and the concurrent features thanks to `useSyncExternalStore`.

---

## 📦 Installation

Install using your preferred package manager:

```bash
pnpm add kosha
```

or

```bash
npm install kosha
```

or

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

### 2. Consume the Store (No Selector)

```tsx
const Counter = () => {
  const { count, increment } = useKosha();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};
```

### 3. Use Selectors

```tsx
const Counter = () => {
  const count = useKosha(state => state.count);
  const increment = useKosha(state => state.increment);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};
```

### 4. Enable Direct Updates via `set`

Kosha no longer exposes `.set` by default. To update the state externally, expose `set` explicitly:

```ts
import { create } from "kosha";

const useKosha = create(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  set, // Exposed manually
}));
```

### 5. Update Outside React

Update the store from anywhere (outside React) using `getState()`:

```ts
useKosha.getState().increment();
```

---

## ⚖️ Why Choose Kosha Over Zustand?

Kosha offers a streamlined alternative for projects where **performance, simplicity**, and **minimal bundle size** matter most.

| Feature                          | Kosha        | Zustand                                          |
| -------------------------------- | ------------ | ------------------------------------------------ |
| Size (minzipped)                 | \~420 bytes  | \~1.1–1.5 kB                                     |
| Built-in Optimized Selectors     | ✅            | ⚠️ Needs shallow equality or manual optimization |
| Partial Updates                  | ✅ (native)   | ✅                                                |
| React 18+ `useSyncExternalStore` | ✅            | ✅                                                |
| Learning Curve                   | Super simple | Simple                                           |

**Example (Selector-Based Optimization in Kosha):**

```tsx
const fullName = useKosha(state => state.firstName + state.lastName);
```

Zustand may still trigger re-renders here unless carefully optimized. See [Zustand’s official docs](https://github.com/pmndrs/zustand/blob/main/docs/guides/prevent-rerenders-with-use-shallow.md) for details.

---

## 📁 Examples

You can find real-world usage examples inside the [`examples/`](https://github.com/react18-tools/kosha/tree/main/examples) directory of this repository.

---

## ❓ FAQ

### 1. Is Kosha production-ready?

Yes! Kosha is stable, lightweight, and tested—suitable for production environments.

### 2. Does Kosha support async actions?

Yes. Define asynchronous logic inside your store methods using `async/await` or promise chains.

### 3. What happens if I don't expose `set`?

You won’t be able to update the store from outside React context. Expose `set` explicitly if needed.

### 4. Does Kosha support React Server Components?

Kosha is designed for client-side state management. Server Component integration isn’t a current goal, but discussions are welcome.

---

## 🤝 Contributing

We welcome contributions from the community!

* 💬 Start a [discussion](https://github.com/react18-tools/kosha/discussions)
* 🐛 Report issues on the [Issue Tracker](https://github.com/react18-tools/kosha/issues)
* 🧪 Submit PRs to improve or extend Kosha

> Have an idea for a feature or roadmap suggestion? Open a discussion and help shape Kosha’s future.

---

## 📜 License

Kosha is licensed under the **MPL-2.0** license.

<img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 20px"/> Explore [our courses](https://mayank-chaudhari.vercel.app/courses) or [support development](https://github.com/sponsors/mayank1513).

---

<p align="center" style="text-align:center">Built with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
