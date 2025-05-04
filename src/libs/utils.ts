

export function makeReadonly<T>(obj: T): Readonly<T> {
    return Object.freeze(obj);
}

export function milliToHr(
    millisec: number
) {
    return +(millisec / (1000 * 60 * 60)).toFixed(2);
}