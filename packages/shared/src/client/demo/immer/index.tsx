import { create } from "kosha";
import { immer } from "kosha/middleware";

interface CounterStore {
  count: number;
  setCount: (count: number) => void;
}

const useKoshaWithImmer = create(
  immer<CounterStore>(set => ({
    count: 0,
    setCount: (count: number) =>
      set(state => {
        state.count = count;
      }),
  })),
);

export const CounterWithImmer = () => {
  const { count, setCount } = useKoshaWithImmer();
  return (
    <div>
      <h2>Example using immer middleware</h2>
      <div>Count: {count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
