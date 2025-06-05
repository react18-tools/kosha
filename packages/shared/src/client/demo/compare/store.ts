import { create as createKosha } from "kosha";
import { create as createZustand } from "zustand";

type SetStateAction<T> = (state: T | ((s: T) => T)) => void;

export interface ICompareStore {
  p1: string;
  p2: number;
  o: {
    a: string;
    b: number;
  };
  a: string[];
}

export interface ICompareStoreActions {
  setP1: (p1: string) => void;
  setP2: (p2: number) => void;
  setO: (o: { a: string; b: number }) => void;
  setA: (a: string[]) => void;
}

const defaultState: ICompareStore = {
  p1: "hi",
  p2: 0,
  o: { a: "hi", b: 0 },
  a: [],
};

const storeCreator = (
  set: SetStateAction<Partial<ICompareStore & ICompareStoreActions>>,
): ICompareStore & ICompareStoreActions => ({
  ...defaultState,
  setP1: p1 => set({ p1 }),
  setP2: p2 => set({ p2 }),
  setO: o => set({ o }),
  setA: a => set({ a }),
});

const useKosha = createKosha<ICompareStore & ICompareStoreActions>(storeCreator);
const useZustand = createZustand<ICompareStore & ICompareStoreActions>()(storeCreator);

export const getStore = (type: "zustand" | "kosha") => (type === "kosha" ? useKosha : useZustand);
