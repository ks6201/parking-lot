import { SecId } from "@d3vtool/secid";
import type { Vehicle } from "../vehicle/vehicle";
import { Configs } from "../../configs";
import type { IParkingSpot } from "../parking-spot/parking-spot";
import type { IParkingFloor } from "../parking-floor/parking-floor";

export interface IPrint {
    print(): void
}

export interface IScan {
    scan(): ParkingTicket 
}

export class ParkingTicket implements IPrint, IParkingFloor, IParkingSpot {
    private _ticketId: string;
    private _entryTimestamp: number;
    
    constructor(
        private _parkedVehicle: Vehicle,
        private _parkedSpot: number,
        private _parkedFloor: number,
    ) {
        this._entryTimestamp = Date.now();
        this._ticketId = SecId.generate(Configs.ID_LENGTH);
    }

    public print(): void {
        console.log(`${'='.repeat(5)} ${this._parkedVehicle.type()} ${'='.repeat(5)}`);
        console.log(`\n${' '.repeat(1)} ${this._ticketId}\n`);
        console.log(`Floor: ${this._parkedFloor}`);
        console.log(`Spot: ${this._parkedSpot}`);

        console.log(`Vehicle name: ${this._parkedVehicle.name()}`);
        console.log(`Vehicle plate: ${this._parkedVehicle.plate()}`);
    }

    public getFloor(): number {
        return this._parkedFloor;
    }

    public getParkedSpot(): number {
        return this._parkedSpot;
    }

    public entryTime() {
        return this._entryTimestamp;
    }

    public getTicketId() {
        return this._ticketId;
    }

    public getParkedVehicle() {
        return this._parkedVehicle;
    }
}

