import { create, StateSetter } from "kosha";

interface MyKosha {
  count: number;
  name: string;
  user: {
    name: string;
    age: number;
  };
  setCount: (count: number) => void;
  set: StateSetter<MyKosha>;
}

export const useMyKosha = create<MyKosha>(set => ({
  count: 0,
  name: "John",
  user: {
    name: "John",
    age: 30,
  },
  setCount: (count: number) => set(state => ({ ...state, count })),
  set,
}));
