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
type StateSetterArgType<T> = ((newState: T) => T) | T;

export const create = <T>(
  storeCreator: (set: (state: StateSetterArgType<T>) => void, get: () => T | null) => T,
) => {
  const listeners = new Set<ListenerWithSelector<T, unknown>>();
  const stateRef: { k: T | null } = { k: null };
  const get = () => stateRef.k;
  const set = (newState: StateSetterArgType<T>) => {
    const oldState = stateRef.k;
    stateRef.k = newState instanceof Function ? newState(stateRef.k!) : newState;

    listeners.forEach(
      ([listener, selectorFunc]) =>
        (!selectorFunc ||
          JSON.stringify(selectorFunc(stateRef.k!)) != JSON.stringify(selectorFunc(oldState!))) &&
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
  return <U = T>(selectorFunc?: (state: T) => U): U => {
    const getSnapshot = () => (selectorFunc ? selectorFunc(stateRef.k!) : stateRef.k) as U;
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
};
