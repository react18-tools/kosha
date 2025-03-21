import { useRef } from "react";
import { useMyKosha } from "./store";
import styles from "../demo.module.scss";

export function Header() {
  const name = useMyKosha(state => state.name);
  const renderCount = useRef(0);
  renderCount.current++;
  return (
    <>
      <h1>Example with Selectors</h1>
      <header className={styles.header}>
        <h2>My name is {name}</h2>
        <small>
          <i>
            Updates only when <code>name</code> changes.{" "}
            <code data-testid="header-render-count">renderCount = {renderCount.current}</code>
          </i>
        </small>
      </header>
    </>
  );
}
