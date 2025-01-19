# Kosha <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 40px"/>

[![Test Status](https://github.com/react18-tools/kosha/actions/workflows/test.yml/badge.svg)](https://github.com/react18-tools/kosha/actions/workflows/test.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/55202c8c7bee2d7a95bd/maintainability)](https://codeclimate.com/github/react18-tools/kosha/maintainability) [![Code Coverage](https://codecov.io/gh/react18-tools/kosha/graph/badge.svg)](https://codecov.io/gh/react18-tools/kosha) [![Version](https://img.shields.io/npm/v/kosha.svg?colorB=green)](https://www.npmjs.com/package/kosha) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/kosha.svg)](https://www.npmjs.com/package/kosha) ![Bundle Size](https://img.shields.io/bundlephobia/minzip/kosha) [![Gitpod Ready](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

### **A Modern, Lightweight, and Powerful State Management Library for React**

Kosha is a minimal global state management solution tailored for modern React applications. At only **571 bytes** (minzipped), it provides exceptional performance and simplicity for developers focused on clean and efficient code.

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

4. **Direct Store Updates**

   - Use `useKosha.set` to update the entire store directly:
     ```tsx
     useKosha.set({ count: 42, user: "John Doe" });
     ```

5. **Flexible Consumption**

   - Use the entire store or specific selectors as needed:
     ```tsx
     const { count, setCount } = useKosha();
     ```

6. **Concurrent Rendering Ready**
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

You can also use `useKosha.set` to update the entire store directly:

```tsx
useKosha.set({ count: 42, user: "John Doe" });
```

---

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
