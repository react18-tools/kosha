/**
 * const useKosha = create()
 */

import { useSyncExternalStore } from "react";

type ListenerWithSelector<T> = [listener: () => void, selectorFunc?: (state: T) => unknown];

export const create = <T>(initialState: T) => {
  let state = initialState;
  const listeners = new Set<ListenerWithSelector<T>>();
  return (selectorFunc?: (state: T) => unknown) => {
    const getSnapshot = () => (selectorFunc ? selectorFunc(state) : state);
    const value = useSyncExternalStore(
      listener => {
        const listenerWithSelector = [listener, selectorFunc] as ListenerWithSelector<T>;
        listeners.add(listenerWithSelector);
        return () => listeners.delete(listenerWithSelector);
      },
      getSnapshot,
      getSnapshot,
    );
    return [
      value,
      (newState: T | ((state: T) => T)) => {
        const oldState = state;
        state = typeof newState === "function" ? (newState as (state: T) => T)(state) : newState;
        listeners.forEach(([listener, selectorFunc]) => {
          if (
            !selectorFunc ||
            JSON.stringify(selectorFunc(state)) != JSON.stringify(selectorFunc(oldState))
          )
            listener();
        });
      },
    ];
  };
};
