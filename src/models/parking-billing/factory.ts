import { BusParkingBilling } from "../../core/parking-billing/impls/bus-parking-billing";
import { CarParkingBilling } from "../../core/parking-billing/impls/car-parking-billing";
import { MotorCycleParkingBilling } from "../../core/parking-billing/impls/motorcycle-parking-billing";
import { VehicleType } from "../../core/vehicle/vehicle-types";


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