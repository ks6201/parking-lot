import { describe, expect, it } from "vitest";
import { FixedArray } from "../src/libs/fixed-array";

describe("FixedArray", () => {
    it("should initialize with correct size and be filled with null", () => {
        const arr = new FixedArray<number>(3);
        expect(arr.length()).toBe(0);
        expect(arr.toArray()).toEqual([null, null, null]);
    });

    it("should push elements and increase length", () => {
        const arr = new FixedArray<number>(2);
        arr.push(1);
        arr.push(2);
        expect(arr.length()).toBe(2);
        expect(arr.toArray()).toEqual([1, 2]);
    });

    it("should throw error on push when full", () => {
        const arr = new FixedArray<number>(1);
        arr.push(5);
        expect(() => arr.push(6)).toThrow("FixedArray: Index exceeds fixed size.");
    });

    it("should pop elements in reverse order", () => {
        const arr = new FixedArray<number>(2);
        arr.push(10);
        arr.push(20);
        expect(arr.pop()).toBe(20);
        expect(arr.pop()).toBe(10);
        expect(arr.length()).toBe(0);
    });

    it("should throw error on pop when empty", () => {
        const arr = new FixedArray<number>(2);
        expect(() => arr.pop()).toThrow("FixedArray: No element left.");
    });

    it("should push at specific index", () => {
        const arr = new FixedArray<string>(3);
        arr.push_at(1, "hello");
        expect(arr.get(1)).toBe("hello");
        expect(arr.length()).toBe(1);
    });

    it("should overwrite at index without increasing length if already occupied", () => {
        const arr = new FixedArray<number>(3);
        arr.push_at(0, 42);
        arr.push_at(0, 100); // overwrite
        expect(arr.get(0)).toBe(100);
        expect(arr.length()).toBe(1);
    });

    it("should throw error on out-of-bounds push_at", () => {
        const arr = new FixedArray<number>(3);
        expect(() => arr.push_at(-1, 5)).toThrow("FixedArray: Out-of-bounds access.");
        expect(() => arr.push_at(3, 5)).toThrow("FixedArray: Out-of-bounds access.");
    });

    it("should pop_at specific index", () => {
        const arr = new FixedArray<number>(2);
        arr.push_at(0, 7);
        expect(arr.pop_at(0)).toBe(7);
        expect(arr.get(0)).toBe(null);
        expect(arr.length()).toBe(0);
    });

    it("should return null on pop_at of empty slot", () => {
        const arr = new FixedArray<number>(2);
        expect(arr.pop_at(0)).toBe(null);
        expect(arr.length()).toBe(0);
    });

    it("should throw error on out-of-bounds pop_at", () => {
        const arr = new FixedArray<number>(2);
        expect(() => arr.pop_at(-1)).toThrow("FixedArray: Out-of-bounds access.");
        expect(() => arr.pop_at(2)).toThrow("FixedArray: Out-of-bounds access.");
    });

    it("should support findIndex with predicate", () => {
        const arr = new FixedArray<number>(3);
        arr.push(10);
        arr.push(20);
        const index = arr.findIndex((val) => val === 20);
        expect(index).toBe(1);
    });

    it("should fill all elements with a value", () => {
        const arr = new FixedArray<string>(2);
        arr.fill("filled");
        expect(arr.toArray()).toEqual(["filled", "filled"]);
        expect(arr.length()).toBe(2);
    });
});