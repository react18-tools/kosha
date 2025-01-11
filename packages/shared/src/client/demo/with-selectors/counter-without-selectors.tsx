import { useRef } from "react";
import { useMyKosha } from "./store";

export function CounterWithoutSelectors() {
  const { count } = useMyKosha();
  const setState = useMyKosha.set;
  const renderCount = useRef(0);
  renderCount.current++;
  return (
    <div>
      <h2>Counter Without Selectors</h2>
      <p>Rerender is triggered every time the state changes.</p>
      <p>Count: {count}</p>
      <button onClick={() => setState(state => ({ ...state, count: count + 1 }))}>Increment</button>
      <button onClick={() => setState(state => ({ ...state, count: count - 1 }))}>Decrement</button>
      <p data-testid="counter2-display">Render Count: {renderCount.current}</p>
    </div>
  );
}
