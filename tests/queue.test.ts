import { describe, expect, it } from "vitest";
import { Queue } from "../src/libs/queue";



describe("Queue", () => {
    it("Should enqueue data and iterate", () => {
        const queue = new Queue<number>();

        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);

        expect(queue.length()).toBe(3);

        const iterator = queue.iterator();

        let expected = 1;
        let count = 0;
    
        while (iterator.hasNext()) {
            expect(iterator.next()).toBe(expected++);
            count++;
        }
    
        expect(count).toBe(3);
    });

    it("Should dequeue data", () => {
        const queue = new Queue<number>();

        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);

        let expected = 1;
        let count = 0;
    
        while (!queue.isEmpty()) {
            expect(queue.dequeue()).toBe(expected++);
            count++;
        }
    
        expect(count).toBe(3);
        expect(queue.length()).toBe(0);
    });

    it("should allow multiple independent iterators over the queue", () => {
        const queue = new Queue<number>();

        for(let i = 1; i <= 10; ++i) {
            queue.enqueue(i);
        }

        const iterator = queue.iterator();
        
        let expected = 1;
        
        while (iterator.hasNext()) {
            expect(iterator.next()).toBe(expected++);
        }
        
        expected = 1;
        const iterator2 = queue.iterator();
        
        expect(iterator2.hasNext()).toBe(true);

        while (iterator2.hasNext()) {
            expect(iterator2.next()).toBe(expected++);
        }
    });
});