import { create } from "kosha";
import { persist } from "kosha/middleware";

interface CounterStore {
  count: number;
  localCount: number;
  setCount: (count: number) => void;
  setLocalCount: (count: number) => void;
}

const usePersistedKosha = create(
  persist<CounterStore>({ key: "test-kosha", partialize: state => ({ count: state.count }) })(
    set => ({
      count: 0,
      localCount: 0,
      setCount: (count: number) => set({ count }),
      setLocalCount: localCount => set({ localCount }),
    }),
  ),
);

export const PersistedCounter = () => {
  const { count, localCount, setCount, setLocalCount } = usePersistedKosha();
  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <div>Local Count: {localCount}</div>
      <button onClick={() => setLocalCount(localCount + 1)}>Increment</button>
    </div>
  );
};
