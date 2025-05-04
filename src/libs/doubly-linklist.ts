import type { IIterator } from "./common-interface";

export class ListNode<T> {
    private _prev: ListNode<T> | null = null;
    private _next: ListNode<T> | null = null;

    constructor(public data: T) {}

    public prev(): ListNode<T> | null {
        return this._prev;
    }

    public setPrev(node: ListNode<T> | null): void {
        this._prev = node;
    }

    public next(): ListNode<T> | null {
        return this._next;
    }

    public setNext(node: ListNode<T> | null): void {
        this._next = node;
    }
}

export class DoublyLinkedList<T> {
    private _length: number = 0;
    private _head: ListNode<T> | null = null;
    private _tail: ListNode<T> | null = null;

    public push(data: T): this {
        const newNode = new ListNode(data);

        if (this.isEmpty()) {
            this._head = this._tail = newNode;
        } else {
            this._tail!.setNext(newNode);
            newNode.setPrev(this._tail);
            this._tail = newNode;
        }

        this._length++;
        return this;
    }

    public pushAhead(data: T): this {
        const newNode = new ListNode(data);

        if (this.isEmpty()) {
            this._head = this._tail = newNode;
        } else {
            newNode.setNext(this._head);
            this._head!.setPrev(newNode);
            this._head = newNode;
        }

        this._length++;
        return this;
    }

    public pop(): T | null {
        if (this.isEmpty()) return null;

        const node = this._tail!;
        const data = node.data;

        if (node.prev()) {
            this._tail = node.prev();
            this._tail!.setNext(null);
        } else {
            this._head = this._tail = null;
        }

        this._length--;
        return data;
    }

    public popHead(): T | null {
        if (this.isEmpty()) return null;

        const node = this._head!;
        const data = node.data;

        this._head = node.next();

        if (this._head) {
            this._head.setPrev(null);
        } else {
            this._tail = null;
        }

        this._length--;
        return data;
    }

    public isEmpty(): boolean {
        return this._head === null;
    }

    public length(): number {
        return this._length;
    }

    public head(): ListNode<T> | null {
        return this._head;
    }

    public tail(): ListNode<T> | null {
        return this._tail;
    }

    public clear(): void {
        this._head = this._tail = null;
        this._length = 0;
    }

    public iterator(): IIterator<T> {
        return new DoublyLinkedListIterator(this);
    }
}

class DoublyLinkedListIterator<T> implements IIterator<T> {
    private currentNode: ListNode<T> | null;

    constructor(list: DoublyLinkedList<T>) {
        this.currentNode = list.head();
    }

    public next(): T {
        if (!this.currentNode) {
            throw new Error("No more elements");
        }

        const data = this.currentNode.data;
        this.currentNode = this.currentNode.next();
        return data;
    }

    public hasNext(): boolean {
        return this.currentNode !== null;
    }
}