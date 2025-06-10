import { create as actualCreate, BaseType, StoreCreator } from "../..";

export const storeResetFns = new Set<() => void>();

export const create = <T extends BaseType>(creator: StoreCreator<T>) => {
  const useStore = actualCreate(creator);
  const initial = useStore.getState();
  storeResetFns.add(() => useStore.setState(initial!, true));
  return useStore;
};

export const resetAllStores = () => storeResetFns.forEach(fn => fn());
