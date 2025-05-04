import Mutex from "@d3vtool/mutex";
import { Queue } from "../../libs/queue";
import { Vehicle } from "../vehicle/vehicle";
import { ErrorOr } from "../../libs/error-or";
import { FixedArray } from "../../libs/fixed-array";
import { ParkingSpot } from "../parking-spot/parking-spot";
import { ParkingTicketBuilder } from "../parking-ticket/parking-ticket-builder";

export interface IParkingFloor {
    getFloor(): number
}

export abstract class ParkingFloor implements IParkingFloor {
    protected _localMutex = new Mutex();
    protected _parkingSpots: FixedArray<ParkingSpot<Vehicle>>;
    protected _vacantSpotQueue: Queue<number> = new Queue<number>();
    
    constructor(
        spotCount: number,
        private _floor: number
    ) {
        this._parkingSpots = new FixedArray<ParkingSpot<Vehicle>>(spotCount);

        for(let idx = 0; idx < this._parkingSpots.size(); idx++) {
            this._vacantSpotQueue.enqueue(idx);
        }
    }

    public getFloor() {
        return this._floor;
    }

    public isFull() {
        return this._parkingSpots.isFull();
    }

    abstract allocate(
        vehicle: Vehicle
    ): Promise<ErrorOr<ParkingTicketBuilder | boolean>>;

    async vacate(
        vehicle: Vehicle
    ): Promise<boolean> {

        const release = await this._localMutex.acquire();

        const vehicleIdx = this._parkingSpots
            .findIndex(spot => spot?.vehicle()?.id() === vehicle.id());

        // console.log(vehicle.id(), this._parkingSpots);
        if(vehicleIdx < 0) {
            return false;
        }

        const result = this._parkingSpots.get(vehicleIdx)?.unpark().value !== null;

        if(result) {
            this._vacantSpotQueue.enqueue(vehicleIdx);
        }

        release();

        return result;
    }
}

