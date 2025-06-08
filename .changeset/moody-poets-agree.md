---
"kosha": minor
---

✨ **Feature:** Introduced `immer` middleware for Kosha

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
