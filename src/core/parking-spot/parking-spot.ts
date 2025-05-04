import { ErrorOr } from "../../libs/error-or";
import type { Vehicle } from "../vehicle/vehicle";

export interface IParkingSpot {
    getParkedSpot(): number
}

export abstract class ParkingSpot<T extends Vehicle> implements IParkingSpot {
    protected _vehicle: T | null = null;

    constructor(
        protected _spotName: number
    ) {};

    public vehicle() {
        return this._vehicle;
    }

    public isSpotVaccant() {
        return this._vehicle === null;
    }

    public getParkedSpot() {
        return this._spotName;
    }

    public abstract park(
        vehicle: T
    ): boolean;

    unpark(): ErrorOr<T | null> {
        if(this.isSpotVaccant()) {
            return ErrorOr.makeError("ParkingSpot: Cannot unpark from an empty spot.");
        }

        const currentParkedVehicle = this._vehicle;
        this._vehicle = null;

        return ErrorOr.makeValue(currentParkedVehicle);
    }
}