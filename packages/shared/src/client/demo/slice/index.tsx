import { create, SliceCreator } from "kosha";
import styles from "../demo.module.scss";

interface CounterSlice {
  count: number;
  setCount: (count: number) => void;
}

interface ThemeSlice {
  theme: string;
  setTheme: (theme: string) => void;
}

type StoreType = CounterSlice & ThemeSlice;

const counterSlice: SliceCreator<StoreType, CounterSlice> = set => ({
  count: 0,
  setCount: (count: number) => set({ count }),
});

const createThemeSlice: SliceCreator<StoreType, ThemeSlice> = set => ({
  theme: "light",
  setTheme: (theme: string) => set({ theme }),
});

const useKosha = create<StoreType>((...a) => ({
  ...createThemeSlice(...a),
  ...counterSlice(...a),
}));

export const SlicingTheStore = () => {
  const { count, setCount, theme, setTheme } = useKosha();
  return (
    <div className={styles.preview}>
      <h2>Example using slices to create the store.</h2>
      <div>
        Count: {count}
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
      <div>
        Theme: {theme}
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>Toggle Theme</button>
      </div>
    </div>
  );
};
