import type { ParkingTicket } from "../parking-ticket/parking-ticket";


export abstract class ParkingBilling {
    constructor(
        protected costPerHr: number
    ) {};

    abstract calculate(
        parkingTicket: ParkingTicket
    ): number;
}