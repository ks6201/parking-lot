import { VehicleType } from "../vehicle/vehicle-types";
import { BusParkingBilling } from "./impls/bus-parking-billing";
import { CarParkingBilling } from "./impls/car-parking-billing";
import { MotorCycleParkingBilling } from "./impls/motorcycle-parking-billing";



export class ParkingBillingFactory {
    public create(
        vehicleType: VehicleType
    ) {
        switch(vehicleType) {
            case VehicleType.Bus:
                return new BusParkingBilling();
            case VehicleType.Car:
                return new CarParkingBilling();
            case VehicleType.MotorCycle:
                return new MotorCycleParkingBilling();
            default:
                throw new Error(`Unsupported billing for vehicle type '${vehicleType}'.`);
        }
    }
}