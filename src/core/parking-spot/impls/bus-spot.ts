import { Bus } from "../../vehicle/impls/bus";
import { ParkingSpot } from "../parking-spot";

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