/**
 * Kosha: A lightweight global state management library for React.
 *
 * @template T - The type of the state object.
 * @param {(set: (state: StateSetterArgType<T>) => void, get: () => T | null) => T} storeCreator
 * A function that initializes the store with its state and actions.
 * @returns {(selectorFunc?: (state: T) => U) => U}
 * A custom React hook to read and subscribe to state slices.
 */

import { useSyncExternalStore } from "react";

type ListenerWithSelector<T, U> = [listener: () => void, selectorFunc?: (state: T) => U];
type StateSetterArgType<T> = ((newState: T) => Partial<T>) | Partial<T> | T;

export const create = <T extends object>(
  storeCreator: (set: (state: StateSetterArgType<T>) => void, get: () => T | null) => T,
) => {
  const listeners = new Set<ListenerWithSelector<T, unknown>>();
  const stateRef: { k: T | null } = { k: null };
  const get = () => stateRef.k;
  const set = (newState: StateSetterArgType<T>) => {
    const oldState = stateRef.k;
    const partial = newState instanceof Function ? newState(stateRef.k!) : newState;
    stateRef.k = { ...stateRef.k!, ...partial };

    listeners.forEach(
      ([listener, selectorFunc]) =>
        (!selectorFunc ||
          (oldState &&
            JSON.stringify(selectorFunc(stateRef.k!)) !==
              JSON.stringify(selectorFunc(oldState)))) &&
        listener(),
    );
  };

  stateRef.k = storeCreator(set, get);

  /**
   * A React hook to access the store's state or derived slices of it.
   * @param {(state: T) => U} [selectorFunc]
   * A function to extract a slice of the state for optimization.
   * @returns {U | T} The selected slice or the entire state.
   */
  const map = new Map<(state: T) => unknown, unknown>();
  const useHook = <U = T>(selectorFunc?: (state: T) => U): U => {
    const getSlice = () => {
      const newValue = selectorFunc!(stateRef.k!);
      const obj = map.get(selectorFunc!);
      const finalValue = JSON.stringify(obj) === JSON.stringify(newValue) ? obj : newValue;
      map.set(selectorFunc!, finalValue);
      return finalValue as U;
    };
    const getSnapshot = () => (selectorFunc ? getSlice() : stateRef.k) as U;
    return useSyncExternalStore(
      listener => {
        const listenerWithSelector = [listener, selectorFunc] as ListenerWithSelector<T, U>;
        listeners.add(listenerWithSelector);
        return () => listeners.delete(listenerWithSelector);
      },
      getSnapshot,
      getSnapshot,
    );
  };

  useHook.set = set;
  return useHook;
};
