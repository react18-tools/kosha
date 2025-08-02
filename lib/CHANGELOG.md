# kosha

## 1.3.1

### Patch Changes

- e39433b: Remove next.js from peedDependency

## 1.3.0

### Minor Changes

- 45bc498: Add test utils

### Patch Changes

- 8519f91: Add immer as optional peer dependency

## 1.2.1

### Patch Changes

- fab33c4: - ✨ Support for Zustand-style **slice composition** via `SliceCreator` utility type.
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

## 1.2.0

### Minor Changes

- 303dd10: ✨ **Feature:** Introduced `immer` middleware for Kosha

  You can now opt-in to immutable state updates via [Immer](https://github.com/immerjs/immer).

  This enables writing simpler, more intuitive state updates using mutable-like syntax:

  ```ts
  const useStore = create(
    immer(set => ({
      count: 0,
      increment: () =>
        set(state => {
          state.count++;
        }),
    })),
  );
  ```

  💡 Listeners will still be triggered correctly as Immer tracks mutations internally and returns new state safely.

  Use with care: avoid returning any value from the mutator function to ensure Immer can do its job properly.

## 1.1.2

### Patch Changes

- c549be2: Simplify and enforce immutability to ensure state is not modified in the function passed to set.

## 1.1.1

### Patch Changes

- 183299f: Fix setter types

## 1.1.0

### Minor Changes

- 60cc3d0: Add setState, Enhanced Testability

  Highlights:

      ✅ Exposed useStore.setState() for external updates and testing

      ✅ Supports both partial and full state updates via replace flag

      🧪 Enables mock-friendly store patterns for unit testing

      🔄 Adds overload-safe StateSetter type for better DX

      📄 Docs updated with usage examples and known limitations

## 1.0.6

### Patch Changes

- ac950f9: Improve type inference and documentation.

## 1.0.5

### Patch Changes

- e0ccf0d: Remove console.logs from the persist plugin

## 1.0.4

### Patch Changes

- 35c3007: fix: update exports in package.json

## 1.0.3

### Patch Changes

- 0cb7920: Add exports field in package.json

## 1.0.2

### Patch Changes

- f63f14f: fix: default to new value if not cached

## 1.0.1

### Patch Changes

- e924612: Expose state to be used outside of the component context where hooks can not be used via getState function

## 1.0.0

### Major Changes

- c52f018: Remove .set method on the hook.

### Minor Changes

- ff41fca: Add persist middleware and update library to support middlewares
- bf86303: Add persist middleware and export types for easing out middleware development.

## 0.0.1

### Patch Changes

- 7f8bb24: fix: Fix infinite loop
- ec70210: Support partials
