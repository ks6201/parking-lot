import { ErrorOr } from "../../../libs/error-or";
import { BusSpot } from "../../parking-spot/impls/bus-spot";
import { ParkingTicketBuilder } from "../../parking-ticket/parking-ticket-builder";
import { Vehicle } from "../../vehicle/vehicle";
import { VehicleType } from "../../vehicle/vehicle-types";
import { ParkingFloor } from "../parking-floor";

export class BusParkingFloor extends ParkingFloor {

    async allocate(vehicle: Vehicle): Promise<ErrorOr<ParkingTicketBuilder | boolean>> {
        
        if(vehicle.type() !== VehicleType.Bus) {
            return ErrorOr.makeError(`Invalid vehicle type: '${vehicle.type()}'`);
        }

        const release = await this._localMutex.acquire()

        const idx = this._vacantSpotQueue.dequeue()!;

        if(idx === null) {
            return ErrorOr.makeValue(false);
        }

        const parkingSpotIdx = idx + 1;

        this._parkingSpots.push_at(idx, new BusSpot(parkingSpotIdx));

        const spot = this._parkingSpots.get(idx)!;
        spot.park(vehicle);

        release();

        const ticketBuilder = new ParkingTicketBuilder();

        ticketBuilder.setParkedSpot(parkingSpotIdx);
        
        return ErrorOr.makeValue(ticketBuilder);
    }
}