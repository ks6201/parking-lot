

export class ErrorOr<T> {
    
    private constructor(
        private _value: T | null,
        private _error: string | null
    ) {};

    public static makeValue<T>(
        value: T
    ) {
        return new ErrorOr<T>(value, null);
    }

    public static makeError<T>(
        error: string
    ) {
        return new ErrorOr<T>(null, error);
    }

    public isError() {
        return this._error !== null;
    }

    public value() {
        return this._value;
    }

    public error() {
        return this._error;
    }
}