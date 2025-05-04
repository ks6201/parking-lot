export interface IIterator<T> {
    next(): T,
    hasNext(): boolean
}