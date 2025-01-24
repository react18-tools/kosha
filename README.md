# Kosha <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 40px"/>

[![Test Status](https://github.com/react18-tools/kosha/actions/workflows/test.yml/badge.svg)](https://github.com/react18-tools/kosha/actions/workflows/test.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/55202c8c7bee2d7a95bd/maintainability)](https://codeclimate.com/github/react18-tools/kosha/maintainability) [![Code Coverage](https://codecov.io/gh/react18-tools/kosha/graph/badge.svg)](https://codecov.io/gh/react18-tools/kosha) [![Version](https://img.shields.io/npm/v/kosha.svg?colorB=green)](https://www.npmjs.com/package/kosha) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/kosha.svg)](https://www.npmjs.com/package/kosha) ![Bundle Size](https://img.shields.io/bundlephobia/minzip/kosha) [![Gitpod Ready](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

### **A Modern, Lightweight, and Powerful State Management Library for React**

Kosha is a minimal global state management solution tailored for modern React applications. At only **420 bytes** (minzipped), it provides exceptional performance and simplicity for developers focused on clean and efficient code.

---

## 🚀 Key Features

1. **Ultra-Lightweight**

   - Minzipped size: **571 bytes**, ideal for performance-critical projects.

2. **Optimized Re-renders**

   - Components only re-render when the selector output changes.
   - Example:
     ```tsx
     const count = useKosha(state => state.count);
     ```

3. **Partial State Updates**

   - Update specific parts of the state easily without spreading:
     ```tsx
     set({ count });
     set(state => ({ count: state.count + 1 }));
     ```

4. **Flexible Consumption**

   - Use the entire store or specific selectors as needed:
     ```tsx
     const { count, setCount } = useKosha();
     ```

5. **Concurrent Rendering Ready**
   - Built on React’s `useSyncExternalStore`, ensuring compatibility with React 18+ features.

---

## ⭐ Installation

Install Kosha using your preferred package manager:

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

## 📖 Usage

### Define a Store

```tsx
import { create } from "kosha";

const useKosha = create(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
}));
```

### Consume Without a Selector

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

### Consume With a Selector

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

### Direct Store Updates

In the latest version, the `.set` method has been removed from the hook. This means `useKosha.set` is no longer available by default.

To use the `set` method, you must explicitly expose it within your store:

```typescript
import { create } from "kosha";

const useKosha = create(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  set, // <- Expose the set method to use it as a standard setter with full functionality
}));
```

---

This post provides a clear comparison between **Kosha** and **Zustand**, emphasizing Kosha's advantages in terms of size, performance, and flexibility. Here’s a brief recap and refinement:

---

### **Why Choose Kosha Over Zustand?**

1. **Lighter & Faster**

   - Kosha’s **minzipped size** is only **420 bytes**, making it ideal for performance-critical projects.
   - Zustand is heavier, which could impact apps where every kilobyte counts.

2. **Optimized Selectors**

   - Kosha ensures **zero unnecessary re-renders** out of the box—components only re-render when the selector output changes.  
     Example:

     ```tsx
     const count = useKosha(state => state.count);
     ```

     or

     ```tsx
     const fullName = useKosha(state => state.firstName + state.lastName);
     ```

   - Zustand requires explicit optimizations and may still trigger redundant re-renders. See the [Zustand docs](https://github.com/pmndrs/zustand/blob/37e1e3f193a5e5dec6fbd0f07514aec59a187e01/docs/guides/prevent-rerenders-with-use-shallow.md).

3. **Built-in Partial Updates**

   - Kosha simplifies **state updates** with clean syntax, no need to spread the previous state manually:

     ```tsx
     set({ count }); // Update 'count' only

     set(state => ({ count: state.count + 1 })); // Increment 'count'
     ```

   - Zustand also supports partial updates in newer versions, but Kosha delivers this efficiency in a smaller footprint.

4. **Flexible API**
   - Kosha allows consuming the entire store when needed:
     ```tsx
     const { count, setCount } = useKosha();
     ```

---

### When to Use Kosha?

Choose **Kosha** if your project prioritizes:

- Minimal bundle size.
- Performance and selector efficiency.
- Modern state management with a lean API.

For larger projects or those already using Zustand’s ecosystem, Kosha offers a streamlined alternative.

## 📌 FAQ

### 1. Does Kosha support async actions?

Yes! You can handle async actions with callbacks or promises directly within your store functions.

### 2. How does Kosha ensure reactivity?

Kosha relies on React’s `useSyncExternalStore` for smooth integration with React’s latest features, including concurrent rendering.

---

## 🤝 Contributing

We welcome your contributions! If you encounter issues or have suggestions, please submit them on the [Kosha GitHub Repository](https://github.com/react18-tools/kosha).

---

## 📜 License

Kosha is licensed under the **MPL-2.0** open-source license.

<img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 20px"/> Check out [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsor our work](https://github.com/sponsors/mayank1513).

---

<p align="center" style="text-align:center">Built with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
