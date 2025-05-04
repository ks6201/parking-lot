import { milliToHr } from "../../../libs/utils";
import type { ParkingTicket } from "../../parking-ticket/parking-ticket";
import { ParkingBilling } from "../parking-billing";


export class CarParkingBilling extends ParkingBilling {

    constructor() {
        super(12)
    }

    calculate(
        parkingTicket: ParkingTicket
    ): number {
        const currentTime = Date.now();

        const elaspedTime = currentTime - parkingTicket.entryTime();

        const elaspedTimeInHr = milliToHr(elaspedTime);

        const cost = elaspedTimeInHr * this.costPerHr;

        return cost;
    }

}