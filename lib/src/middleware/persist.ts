import { Middleware, StateSetterArgType } from "..";

export interface PersistOptions<S, PersistedState = S> {
  /** Storage Key (must be unique) */
  key: string;
  /**
   * Use a custom persist storage.
   *
   * Combining `createJSONStorage` helps creating a persist storage
   * with JSON.parse and JSON.stringify.
   *
   * @default createJSONStorage(() => localStorage)
   */
  partialize?: (state: Partial<S>) => PersistedState;
  /**
   * If the stored state's version mismatch the one specified here, the storage will not be used.
   * This is useful when adding a breaking change to your store.
   */
  version?: number;
  /**
   * A function to perform persisted state migration.
   * This function will be called when persisted state versions mismatch with the one specified here.
   */
  migrate?: (persistedState: unknown, version: number) => PersistedState | Promise<PersistedState>;
}

export const persist = <T, Ps>(options: PersistOptions<T, Ps>): Middleware<T> => {
  if (typeof localStorage === "undefined") return stateCreator => stateCreator;
  return stateCreator => (set, get) => {
    const onStorageChange = () => {
      const persistedVal = localStorage.getItem(options.key);
      if (!persistedVal) return;
      const parsed = JSON.parse(persistedVal);
      if (parsed.version !== options.version) {
        if (options.migrate) options.migrate(parsed.state, parsed.version);
      } else return;
      set(parsed.state);
    };
    onstorage = onStorageChange;
    onStorageChange();
    const persistSetter = (newStatePartial: StateSetterArgType<T>) => {
      const newState =
        newStatePartial instanceof Function ? newStatePartial(get()!) : newStatePartial;
      const partial = options.partialize ? options.partialize(newState) : newState;
      localStorage.setItem(
        options.key,
        JSON.stringify({ state: partial, version: options.version }),
      );
      set(newStatePartial);
    };
    return stateCreator(persistSetter, get);
  };
};
