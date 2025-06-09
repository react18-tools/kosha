import { create } from "kosha";
import { persist } from "kosha/middleware";
import styles from "../demo.module.scss";

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
    <div className={styles.preview}>
      <h2>Example using persist middleware</h2>
      <div>
        Count: {count}
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
      <div>
        Local Count: {localCount}
        <button onClick={() => setLocalCount(localCount + 1)}>Increment</button>
      </div>
    </div>
  );
};
