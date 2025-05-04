import { DoublyLinkedList } from "./doubly-linklist";


export class Queue<T> {
    private _list: DoublyLinkedList<T>;

    constructor() {
        this._list = new DoublyLinkedList<T>();
    }

    public enqueue(
        data: T
    ) {
        this._list.push(data);
    }

    public dequeue(): T | null {
        return this._list.popHead();
    }

    public isEmpty() {
        return this._list.isEmpty();
    }

    public length() {
        return this._list.length();
    }

    public iterator() {
        return this._list.iterator();
    }
}