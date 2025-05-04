import { Configs } from "../../../configs";
import { VehicleType } from "../../vehicle/vehicle-types";
import { ParkingLot, type ParkingFloorRange } from "../parking-lot";
import { BusParkingFloor } from "../../parking-floor/impls/bus-parking-floor";


export class BusParkingLot extends ParkingLot {
    private _noOfParkingSpot: number;

    constructor(
        _floorRange: ParkingFloorRange
    ) {
        super(_floorRange, VehicleType.Bus);
        this._noOfParkingSpot = Configs.PARKING_SPOT_COUNT;
        this._floors.fill((index) => new BusParkingFloor(this._noOfParkingSpot, this._floorRange[0] + index));
    }
}