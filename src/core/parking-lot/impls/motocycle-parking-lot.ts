import { Configs } from "../../../configs";
import { VehicleType } from "../../vehicle/vehicle-types";
import { ParkingLot, type ParkingFloorRange } from "../parking-lot";
import { MotorCycleParkingFloor } from "../../parking-floor/impls/motocycle-parking-floor";


export class MotorCycleParkingLot extends ParkingLot {
    private _noOfParkingSpot: number;

    constructor(
        _floorRange: ParkingFloorRange
    ) {
        super(_floorRange, VehicleType.MotorCycle);
        this._noOfParkingSpot = Configs.PARKING_SPOT_COUNT;
                this._floors.fill(
                    (index) => new MotorCycleParkingFloor(
                        this._noOfParkingSpot, 
                        this._floorRange[0] + index
                    )
                );
    }
}