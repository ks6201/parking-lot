import { ParkingSpot } from "../parking-spot";
import { Car } from "../../vehicle/impls/car";

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