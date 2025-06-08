import { produce } from "immer";
import { BaseType, Mutable, StateSetter as KoshaStateSetter } from "..";

type StateSetterArgType<T> = ((draft: Mutable<T>) => void | T) | Partial<T> | T;

type StateSetter<T> = {
  (state: StateSetterArgType<T>, replace?: false): void;
  (state: ((draft: Mutable<T>) => void | T) | T, replace: true): void;
};

type StoreCreator<T extends BaseType> = (
  set: StateSetter<T>,
  get: () => T | null,
) => T & { __get?: () => T | null };

export const immer =
  <T extends BaseType>(storeCreator: StoreCreator<T>) =>
  (set: KoshaStateSetter<T>, get: () => T | null) => {
    const immerSet: StateSetter<T> = (fnOrState, replace?) => {
      const current = get()!;
      let nextState = fnOrState instanceof Function ? produce(current, fnOrState) : fnOrState;

      if (replace) set(nextState as T, true);
      else set(nextState as Partial<T>);
    };

    return {
      ...storeCreator(immerSet, get),
    };
  };
