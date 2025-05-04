import { ParkingSpot } from "../parking-spot";
import { MotorCycle } from "../../vehicle/impls/motorcycle";

export class MotorCycleSpot extends ParkingSpot<MotorCycle> {
    public park(
        vehicle: MotorCycle
    ): boolean {
        
        if(!this.isSpotVaccant()) {
            return false;
        }

        this._vehicle = vehicle;

        return true;
    }
}
