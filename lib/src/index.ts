/**
 * const useKosha = create()
 */

import { useSyncExternalStore } from "react";

type ListenerWithSelector<T> = [listener: () => void, selectorFunc?: (state: T | null) => unknown];

export const create = <T>(storeCreator: (set: (state: T) => void, get: () => T | null) => T) => {
  const listeners = new Set<ListenerWithSelector<T>>();
  // Avoid closure lockins by using ref
  const stateRef: { k: T | null } = { k: null };
  const get = () => stateRef.k;
  const set = (newState: T) => {
    const oldState = stateRef.k;
    stateRef.k = typeof newState === "function" ? newState(stateRef.k) : newState;
    listeners.forEach(([listener, selectorFunc]) => {
      if (
        !selectorFunc ||
        JSON.stringify(selectorFunc(stateRef.k)) != JSON.stringify(selectorFunc(oldState))
      )
        listener();
    });
  };

  stateRef.k = storeCreator(set, get);
  return (selectorFunc?: (state: T | null) => unknown) => {
    const getSnapshot = () => (selectorFunc ? selectorFunc(stateRef.k) : stateRef.k);
    const value = useSyncExternalStore(
      listener => {
        const listenerWithSelector = [listener, selectorFunc] as ListenerWithSelector<T>;
        listeners.add(listenerWithSelector);
        return () => listeners.delete(listenerWithSelector);
      },
      getSnapshot,
      getSnapshot,
    );
    return value;
  };
};

const useKosha = create(set => ({
  banana: 2,
  setBanana: (banana: number) => set({ banana }),
}));
