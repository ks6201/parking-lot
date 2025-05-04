import { ParkingSpot } from "../../../core/parking-spot/parking-spot";
import { Bus } from "../../../core/vehicle/impls/bus";

export class BusSpot extends ParkingSpot<Bus> {
    public park(
        vehicle: Bus
    ): boolean {
        
        if(!this.isSpotVaccant()) {
            return false;
        }

        this._vehicle = vehicle;

        return true;
    }
}