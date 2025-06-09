---
"kosha": patch
---

- Support for Zustand-style **slice composition** via `SliceCreator` utility type.
- Now you can structure your store in a modular, scalable way by composing smaller slices and combining them into a single store.

```ts
export type SliceCreator<TStore extends BaseType, TSlice = Partial<TStore>> = (
  set: StateSetter<TStore>,
  get: () => TStore | null,
) => TSlice;
```

**Usage**

```
const useKosha = create<StoreType>((...a) => ({
  ...createThemeSlice(...a),
  ...counterSlice(...a),
}));
```
