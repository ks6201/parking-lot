import { Bus } from "./impls/bus";
import { Car } from "./impls/car";
import { Vehicle } from "./vehicle";
import { VehicleType } from "./vehicle-types";
import { MotorCycle } from "./impls/motorcycle";

export class VehicleFactory {
    public create(
        name: string,
        model: string,
        plate: string,
        type: VehicleType,
    ): Vehicle {

        switch(type) {
            case VehicleType.MotorCycle:
                return new MotorCycle(name, model, plate);
            case VehicleType.Car:
                return new Car(name, model, plate);
            case VehicleType.Bus:
                return new Bus(name, model, plate);
            default:
                throw new Error(`Unsupported vehicle type: '${type}'`);
        }
    }
}
