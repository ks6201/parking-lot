export type FillFn<T> = (index: number) => T;
export type FindIndexFn<T> = (value: T | null, index: number) => boolean;

export class FixedArray<T> {
    private count: number = 0;
    private _array: Array<T | null>;

    constructor(private readonly _size: number) {
        if (this._size <= 0) {
            throw new Error("FixedArray: size must be greater than 0.");
        }

        this._array = new Array<T | null>(this._size).fill(null);
    }

    public push(data: T): void {
        if (this.count >= this.size()) {
            throw new Error("FixedArray: Index exceeds fixed size.");
        }

        this._array[this.count] = data;
        this.count++;
    }

    public push_at(index: number, data: T): void {
        if (index < 0 || index >= this.size()) {
            throw new Error("FixedArray: Out-of-bounds access.");
        }

        if (this._array[index] === null) {
            this.count++;
        }

        this._array[index] = data;
    }

    public pop(): T | null {
        if (this.count === 0) {
            throw new Error("FixedArray: No element left.");
        }

        this.count--;
        const data = this._array[this.count];
        this._array[this.count] = null;

        return data;
    }

    public pop_at(index: number): T | null {
        if (index < 0 || index >= this.size()) {
            throw new Error("FixedArray: Out-of-bounds access.");
        }

        const data = this._array[index];
        if (data !== null) {
            this._array[index] = null;
            this.count--;
        }

        return data;
    }

    public findIndex(fn: FindIndexFn<T>): number {
        return this._array.findIndex((val, idx) => fn(val, idx));
    }

    public isFull() {
        return this.length() === this.size();
    }

    public fill(data_or_fn: T | FillFn<T>): void {
        if (data_or_fn instanceof Function) {
            this._array.fill(null).forEach((_, index) => {
                this._array[index] = (data_or_fn as FillFn<T>)(index);
            });
        } else {
            this._array.fill(data_or_fn);
        }
        this.count = this.size()
    }

    public get(index: number): T | null {
        if (index < 0 || index >= this.size()) {
            throw new Error("FixedArray: Out-of-bounds access.");
        }

        return this._array[index];
    }

    public toArray(): ReadonlyArray<T | null> {
        return this._array.slice(); // shallow copy
    }

    public length(): number {
        return this.count;
    }

    public size() {
        return this._size;
    }

    public reserve(size: number) {
        
    }
}