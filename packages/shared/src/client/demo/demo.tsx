"use client";

import { BasicExample } from "./basic-example";
import styles from "./demo.module.scss";
import basicExampleCode from "./basic-example/basic-example.tsx?raw";
import counterCode from "./basic-example/counter.tsx?raw";
import { CodeDisplay } from "./code-display";
import { WithSelector } from "./with-selectors";
import withSelectorCode from "./with-selectors/with-selectors.tsx?raw";
import storeCode from "./with-selectors/store.ts?raw";
import couter2Code from "./with-selectors/counter.tsx?raw";
import counterWithoutSelectorscode from "./with-selectors/counter-without-selectors.tsx?raw";
import headerCode from "./with-selectors/header.tsx?raw";
import userDataCode from "./with-selectors/user-data.tsx?raw";
import { PersistedCounter } from "./persist";
import PersistedCounterCode from "./persist?raw";
import { Compare } from "./compare";
import compareCode from "./compare?raw";
import compareStoreCode from "./compare/store?raw";
import { CounterWithImmer } from "./immer";
import CounterWithImmerCode from "./immer?raw";
import { SlicingTheStore } from "./slice";
import SlicingTheStoreCode from "./slice?raw";

const compareExCode = [
  { filename: "compare.tsx", code: compareCode },
  { filename: "store.ts", code: compareStoreCode },
];

const basicExCode = [
  { filename: "counter.tsx", code: counterCode },
  { filename: "basic-example.tsx", code: basicExampleCode },
];

const withSelectorExCode = [
  { filename: "store.ts", code: storeCode },
  { filename: "header.tsx", code: headerCode },
  { filename: "counter.tsx", code: couter2Code },
  { filename: "counter-without-selectors.tsx", code: counterWithoutSelectorscode },
  { filename: "user-data.tsx", code: userDataCode },
  { filename: "with-selectors.tsx", code: withSelectorCode },
];

/** React live demo */
export function Demo() {
  return (
    <>
      <div className={styles.demo}>
        <h2 className={styles.preview}>A tiny yet powerful store for modern react libraries.</h2>
        <img src="https://img.shields.io/bundlephobia/minzip/kosha" alt="NPM Bundle Size" />
      </div>
      <div className={styles.demo}>
        <Compare />
        <CodeDisplay code={compareExCode} />
      </div>
      <div className={styles.demo}>
        <PersistedCounter />
        <CodeDisplay code={[{ filename: "index.tsx", code: PersistedCounterCode }]} />
      </div>
      <div className={styles.demo}>
        <CounterWithImmer />
        <CodeDisplay code={[{ filename: "index.tsx", code: CounterWithImmerCode }]} />
      </div>
      <div className={styles.demo}>
        <SlicingTheStore />
        <CodeDisplay code={[{ filename: "index.tsx", code: SlicingTheStoreCode }]} />
      </div>
      <div className={styles.demo}>
        <BasicExample />
        <CodeDisplay code={basicExCode} />
      </div>
      <div className={styles.demo}>
        <WithSelector />
        <CodeDisplay code={withSelectorExCode} />
      </div>
    </>
  );
}
