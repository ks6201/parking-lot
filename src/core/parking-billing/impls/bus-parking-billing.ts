import { milliToHr } from "../../../libs/utils";
import type { ParkingTicket } from "../../parking-ticket/parking-ticket";
import { ParkingBilling } from "../parking-billing";


export class BusParkingBilling extends ParkingBilling {

    constructor() {
        super(20)
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