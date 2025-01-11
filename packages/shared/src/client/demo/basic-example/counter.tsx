import { create } from "kosha";

interface CounterStore {
  count: number;
  setCount: (count: number) => void;
}

const useKosha = create<CounterStore>(set => ({
  count: 0,
  setCount: (count: number) => set(state => ({ ...state, count })),
}));

/** Counter Controller */
export const CounterController = () => {
  const { count, setCount } = useKosha();
  return <input type="number" value={count} onChange={e => setCount(Number(e.target.value))} />;
};

/** Counter Display  */
export const CounterDisplay = () => {
  const { count } = useKosha();
  return <div>{count}</div>;
};
