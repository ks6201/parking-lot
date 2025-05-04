import { Configs } from "../../../configs";
import { VehicleType } from "../../vehicle/vehicle-types";
import { ParkingLot, type ParkingFloorRange } from "../parking-lot";
import { CarParkingFloor } from "../../parking-floor/impls/car-parking-floor";


export class CarParkingLot extends ParkingLot {
    private _noOfParkingSpot: number;

    constructor(
        _floorRange: ParkingFloorRange
    ) {
        super(_floorRange, VehicleType.Car);
        this._noOfParkingSpot = Configs.PARKING_SPOT_COUNT;
        this._floors.fill((index) => new CarParkingFloor(this._noOfParkingSpot, this._floorRange[0] + index));
    }    
}