import { create } from "kosha";

interface MyKosha {
  count: number;
  name: string;
  user: {
    name: string;
    age: number;
  };
}

export const useMyKosha = create<MyKosha>(set => ({
  count: 0,
  name: "John",
  user: {
    name: "John",
    age: 30,
  },
}));
