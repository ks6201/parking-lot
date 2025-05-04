import { ErrorOr } from "../../../libs/error-or";
import { MotorCycleSpot } from "../../parking-spot/impls/motorcycle-spot";
import type { ParkingSpot } from "../../parking-spot/parking-spot";
import { ParkingTicketBuilder } from "../../parking-ticket/parking-ticket-builder";
import { Vehicle } from "../../vehicle/vehicle";
import { VehicleType } from "../../vehicle/vehicle-types";
import { ParkingFloor } from "../parking-floor";


export class MotorCycleParkingFloor extends ParkingFloor {

    async allocate(vehicle: Vehicle): Promise<ErrorOr<ParkingTicketBuilder | boolean>> {
        
        if(vehicle.type() !== VehicleType.MotorCycle) {
            return ErrorOr.makeError(`Invalid vehicle type: '${vehicle.type()}'`);
        }

        const release = await this._localMutex.acquire()

        const idx = this._vacantSpotQueue.dequeue()!;

        if(idx === null) {
            return ErrorOr.makeValue(false);
        }

        const parkingSpotIdx = idx + 1;

        this._parkingSpots.push_at(idx, new MotorCycleSpot(parkingSpotIdx));

        const spot = this._parkingSpots.get(idx)!;
        spot.park(vehicle);

        release();

        const ticketBuilder = new ParkingTicketBuilder();

        ticketBuilder.setParkedSpot(parkingSpotIdx);
        
        return ErrorOr.makeValue(ticketBuilder);
    }
}