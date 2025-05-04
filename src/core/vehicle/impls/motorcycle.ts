import { Vehicle } from "../vehicle";
import { VehicleType } from "../vehicle-types";

export class MotorCycle extends Vehicle {
    constructor(
        name: string,
        model: string,
        plate: string,
    ) {
        super(name, model, plate, VehicleType.MotorCycle);
    }
}