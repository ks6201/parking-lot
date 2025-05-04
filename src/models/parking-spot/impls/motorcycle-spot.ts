import { MotorCycle } from "../../../core/vehicle/impls/motorcycle";
import { ParkingSpot } from "../../../core/parking-spot/parking-spot";

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
