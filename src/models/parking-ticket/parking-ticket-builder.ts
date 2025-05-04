import { Vehicle } from "../../core/vehicle/vehicle";
import { ParkingTicket } from "../../core/parking-ticket/parking-ticket";

export interface IParkingTicketBuilder {
    build(): ParkingTicket,
    setParkedSpot(spot: number): void,
    setParkedFloor(floor: number): void
    setParkedVehicle(vehicle: Vehicle): void,
}

export class ParkingTicketBuilder implements IParkingTicketBuilder {

    private _parkedVehicle: Vehicle | null = null;
    private _parkedSpot: number | null = null;
    private _parkedFloor: number | null = null;

    public setParkedVehicle(vehicle: Vehicle): void {
        this._parkedVehicle = vehicle;
    }

    public setParkedSpot(spot: number): void {
        this._parkedSpot = spot;
    }

    public setParkedFloor(floor: number): void {
        this._parkedFloor = floor;
    }

    public build() {
        if(
            this._parkedFloor === null ||
            this._parkedVehicle === null ||
            this._parkedSpot === null
        ) {
            throw new Error("Trying to build for incomplete ticket information.");
        }

        return new ParkingTicket(
            this._parkedVehicle,
            this._parkedSpot,
            this._parkedFloor
        );
    }
}