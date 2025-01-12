/**
 * Test cases for Kosha store using Vitest.
 */

import { describe, expect, test } from "vitest";
import { create } from "../src";
import { renderHook, act } from "@testing-library/react";

interface TestStore {
  bananas: number;
  addBanana: () => void;
}

describe("Kosha: Global state store tests", () => {
  // Create the Kosha store
  const useKosha = create<TestStore>(set => ({
    bananas: 0,
    addBanana: () => set(state => ({ bananas: state.bananas + 1 })),
  }));

  test("Initial state should be correct", () => {
    const { result } = renderHook(() => useKosha(state => ({ ...state })));
    const state = result.current;
    expect(state.bananas).toBe(0); // Initial bananas count
  });

  test("addBanana action should update the state correctly", () => {
    const { result } = renderHook(() => useKosha(state => ({ ...state })));

    act(() => result.current.addBanana());

    expect(result.current.bananas).toBe(1); // Updated bananas count
  });
});
