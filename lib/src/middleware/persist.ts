import { BaseType, Middleware, StateSetterArgType } from "..";

export interface PersistOptions<S> {
  /** Storage Key (must be unique) */
  key: string;
  /**
   * Filter the persisted value.
   *
   * @params state The state's value
   */
  partialize?: (state: S) => Partial<S>;
  /**
   * If the stored state's version mismatch the one specified here, the storage will not be used.
   * This is useful when adding a breaking change to your store.
   */
  version?: number;
  /**
   * A function to perform persisted state migration.
   * This function will be called when persisted state versions mismatch with the one specified here.
   */
  migrate?: (persistedState: unknown, version: number) => Partial<S> | Promise<Partial<S>>;
}

export const persist =
  <T extends BaseType>(options: PersistOptions<T>): Middleware<T> =>
  stateCreator =>
  (set, get) => {
    let isSynced = false;
    const onStorageChange = () => {
      const persistedVal = localStorage.getItem(options.key);
      if (!persistedVal) return;
      const parsed = JSON.parse(persistedVal);
      if (options.version === undefined || options.version === parsed.version) {
        console.log({ parsed });
        set(parsed.state);
      } else if (options.migrate) {
        const newState = options.migrate(parsed.state, parsed.version);
        if (newState instanceof Promise) {
          newState.then(newState => {
            set(newState);
          });
        } else {
          set(newState);
        }
      }
    };
    const persistSetter = (newStatePartial: StateSetterArgType<T>) => {
      const newState = {
        ...get(),
        ...(newStatePartial instanceof Function ? newStatePartial(get()!) : newStatePartial),
      };
      const partial = options.partialize ? options.partialize(newState as T) : newState;
      localStorage.setItem(
        options.key,
        JSON.stringify({ state: partial, version: options.version }),
      );
      set(newState);
    };
    const persistGetter = () => {
      console.log("persist getter called --- ");
      if (!isSynced && typeof window !== "undefined") {
        onStorageChange();
        window.addEventListener("storage", onStorageChange);
        isSynced = true;
      }
      return get();
    };
    return { ...stateCreator(persistSetter, get), __get: persistGetter };
  };
