import { describe, it, expect, beforeEach } from "vitest";
import { DoublyLinkedList } from "../src/libs/doubly-linklist";

describe("DoublyLinkedList", () => {
    let list: DoublyLinkedList<number>;

    beforeEach(() => {
        list = new DoublyLinkedList<number>();
    });

    it("should initially be empty", () => {
        expect(list.isEmpty()).toBe(true);
        expect(list.length()).toBe(0);
        expect(list.head()).toBeNull();
        expect(list.tail()).toBeNull();
    });

    it("should push elements to the tail", () => {
        list.push(1).push(2).push(3);

        expect(list.length()).toBe(3);
        expect(list.head()?.data).toBe(1);
        expect(list.tail()?.data).toBe(3);
    });

    it("should push elements to the head using pushAhead", () => {
        list.pushAhead(1).pushAhead(2).pushAhead(3);

        expect(list.length()).toBe(3);
        expect(list.head()?.data).toBe(3);
        expect(list.tail()?.data).toBe(1);
    });

    it("should pop from tail", () => {
        list.push(10).push(20).push(30);

        expect(list.pop()).toBe(30);
        expect(list.pop()).toBe(20);
        expect(list.pop()).toBe(10);
        expect(list.pop()).toBeNull();
        expect(list.length()).toBe(0);
    });

    it("should pop from head using popHead", () => {
        list.push(10).push(20).push(30);

        expect(list.popHead()).toBe(10);
        expect(list.popHead()).toBe(20);
        expect(list.popHead()).toBe(30);
        expect(list.popHead()).toBeNull();
        expect(list.length()).toBe(0);
    });

    it("should iterate through all values", () => {
        list.push(1).push(2).push(3);

        const iter = list.iterator();
        const values: number[] = [];

        while (iter.hasNext()) {
            values.push(iter.next());
        }

        expect(values).toEqual([1, 2, 3]);
    });

    it("should clear the list", () => {
        list.push(1).push(2);
        list.clear();

        expect(list.length()).toBe(0);
        expect(list.isEmpty()).toBe(true);
        expect(list.head()).toBeNull();
        expect(list.tail()).toBeNull();
    });
});
