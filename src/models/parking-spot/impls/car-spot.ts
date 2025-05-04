import { Car } from "../../../core/vehicle/impls/car";
import { ParkingSpot } from "../../../core/parking-spot/parking-spot";

export class CarSpot extends ParkingSpot<Car> {
    public park(
        vehicle: Car
    ): boolean {
        
        if(!this.isSpotVaccant()) {
            return false;
        }

        this._vehicle = vehicle;

        return true;
    }
}