import Mutex from "@d3vtool/mutex";
import { Vehicle } from "../vehicle/vehicle";
import { ErrorOr } from "../../libs/error-or";
import { FixedArray } from "../../libs/fixed-array";
import { ParkingFloor } from "../parking-floor/parking-floor";
import { ParkingTicket } from "../parking-ticket/parking-ticket";
import { VehicleType } from "../vehicle/vehicle-types";
import { ParkingTicketBuilder } from "../parking-ticket/parking-ticket-builder";

export type ParkingFloorRange = [number, number];

export abstract class ParkingLot {
    protected _totalFloors: number;
    protected _localMutex = new Mutex();
    protected _floors: FixedArray<ParkingFloor>;
    protected _vehicleIdToFloorMap = new Map<string, ParkingFloor>();
    
    constructor(
        protected _floorRange: ParkingFloorRange,
        protected _vehicleType: VehicleType,
    ) {
        this._totalFloors = this._floorRange[1] - this._floorRange[0];
        this._floors = new FixedArray<ParkingFloor>(this._totalFloors);
    }

    async redirectTraffic(vehicle: Vehicle): Promise<ErrorOr<ParkingTicket>> {

        for(let idx = 0; idx < this._totalFloors; ++idx) {
            const floor = this._floors.get(idx)!;
            
            if(floor.isFull()) continue;
            
            const result = await floor?.allocate(vehicle);
            
            if((typeof result?.value() === "boolean" && !result.value()) || !result) {
                continue;
            }

            if(result.isError()) {
                return ErrorOr.makeError(result.error()!);
            }

            const release = await this._localMutex.acquire();
            this._vehicleIdToFloorMap.set(vehicle.id(), floor!);
            release();

            const ticketBuilder = result.value() as ParkingTicketBuilder;

            const parkedFloor = idx + this._floorRange[0];

            ticketBuilder.setParkedFloor(parkedFloor);
            ticketBuilder.setParkedVehicle(vehicle);

            return ErrorOr.makeValue(ticketBuilder.build());
        }

        return ErrorOr.makeError("Can't find floor to park.");
    }

    public vehicleType() {
        return this._vehicleType;
    }

    public getFloorRange() {
        return this._floorRange;
    }

    async remove(
        vehicle: Vehicle
    ): Promise<ErrorOr<boolean>> {
        const floor = this._vehicleIdToFloorMap.get(vehicle.id());
        
        if(!floor) {
            return ErrorOr.makeError("Floor not found");
        }
        
        const wasSuccess = await floor.vacate(vehicle);

        if(!wasSuccess) {
            return ErrorOr.makeValue(wasSuccess);
        }

        const release = await this._localMutex.acquire();
        this._vehicleIdToFloorMap.delete(vehicle.id());
        release();

        return ErrorOr.makeValue(true);
    }

}