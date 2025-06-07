import { useRef } from "react";
import { getStore, ICompareStore, ICompareStoreActions } from "./store";
import { ErrorBoundary } from "react-error-boundary";
import styles from "./compare.module.scss";

interface StoreTypeProps {
  type: "zustand" | "kosha";
}

type ComponentProps = ICompareStore & ICompareStoreActions;

const P1 = ({ p1, setP1 }: Pick<ComponentProps, "p1" | "setP1">) => {
  const renderCountRef = useRef(0);
  renderCountRef.current++;
  return (
    <div>
      <p className="display">
        p1:
        <button onClick={() => setP1(crypto.randomUUID())}>Update</button>
        {p1.slice(25)} | renderCount is {renderCountRef.current}
      </p>
    </div>
  );
};

const P2 = ({ p2, setP2 }: Pick<ComponentProps, "p2" | "setP2">) => {
  const renderCountRef = useRef(0);
  renderCountRef.current++;
  return (
    <div>
      <p className="display">
        p2:
        <button onClick={() => setP2(Math.random())}>Update</button>
        {p2.toFixed(6)} | renderCount is {renderCountRef.current}
      </p>
    </div>
  );
};

const P1ExtractAsObj = ({ type }: StoreTypeProps) => {
  const { p1, setP1 } = getStore(type)(({ p1, setP1 }) => ({ p1, setP1 }));
  return <P1 {...{ p1, setP1 }} />;
};

const P1ExtractAsArray = ({ type }: StoreTypeProps) => {
  const [p1, setP1] = getStore(type)(({ p1, setP1 }) => [p1, setP1]);
  return <P1 {...{ p1, setP1 }} />;
};

const P1ExtractIndividually = ({ type }: StoreTypeProps) => {
  const p1 = getStore(type)(({ p1 }) => p1);
  const setP1 = getStore(type)(({ setP1 }) => setP1);
  return <P1 {...{ p1, setP1 }} />;
};

const P2ExtractAsObj = ({ type }: StoreTypeProps) => {
  const { p2, setP2 } = getStore(type)(({ p2, setP2 }) => ({ p2, setP2 }));
  return <P2 {...{ p2, setP2 }} />;
};

const P2ExtractAsArray = ({ type }: StoreTypeProps) => {
  const [p2, setP2] = getStore(type)(({ p2, setP2 }) => [p2, setP2]);
  return <P2 {...{ p2, setP2 }} />;
};

const P2ExtractIndividually = ({ type }: StoreTypeProps) => {
  const p2 = getStore(type)(({ p2 }) => p2);
  const setP2 = getStore(type)(({ setP2 }) => setP2);
  return <P2 {...{ p2, setP2 }} />;
};

export const Compare = () => (
  <div className={styles.compare}>
    <div className={styles.compare__store}>
      <h2>Kosha</h2>
      <h4>Extract as Object</h4>
      <code>{`const { p2, setP2 } = myStore(({ p2, setP2 }) => ({ p2, setP2 }))`}</code>
      <P1ExtractAsObj type="kosha" />
      <P2ExtractAsObj type="kosha" />
      <hr />
      <h4>Extract as Array</h4>
      <code>{`const [p2, setP2] = myStore(({ p2, setP2 }) => [p2, setP2] )`}</code>
      <P1ExtractAsArray type="kosha" />
      <P2ExtractAsArray type="kosha" />
      <hr />
      <h4>Extract individually</h4>
      <code>{`const p2 = myStore(({ p2 }) => p2)`}</code>
      <P1ExtractIndividually type="kosha" />
      <P2ExtractIndividually type="kosha" />
    </div>
    <div className={styles.compare__store}>
      <h2>Zustand</h2>
      <h4>Extract as Object</h4>
      <code>{`const { p2, setP2 } = myStore(({ p2, setP2 }) => ({ p2, setP2 }))`}</code>
      <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
        <P1ExtractAsObj type="zustand" />
      </ErrorBoundary>
      <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
        <P2ExtractAsObj type="zustand" />
      </ErrorBoundary>
      <hr />
      <h4>Extract as Array</h4>
      <code>{`const [p2, setP2] = myStore(({ p2, setP2 }) => [p2, setP2] )`}</code>
      <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
        <P1ExtractAsArray type="zustand" />
      </ErrorBoundary>
      <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
        <P2ExtractAsArray type="zustand" />
      </ErrorBoundary>
      <hr />
      <h4>Extract individually</h4>
      <code>{`const p2 = myStore(({ p2 }) => p2)`}</code>
      <P1ExtractIndividually type="zustand" />
      <P2ExtractIndividually type="zustand" />
    </div>
  </div>
);
