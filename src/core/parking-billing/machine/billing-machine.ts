import type { ParkingLot } from "../../parking-lot/parking-lot";
import type { ParkingTicket } from "../../parking-ticket/parking-ticket";
import type { IBillingState } from "../interfaces";
import type { ParkingBilling } from "../parking-billing";
import { Idle, PaymentRecevied, WaitingForPayment } from "./states";

export class BillingMachine {
    public idle: IBillingState = new Idle(this);
    public paymentRecevied: IBillingState = new PaymentRecevied(this);
    public waitingForPayment: IBillingState = new WaitingForPayment(this);
    
    private _currentState: IBillingState;

    private _amountDue: number = 0;

    private _changeToReturn: number = 0;
    
    constructor(
        private _parkBilling: ParkingBilling,
        private _parkingTicket: ParkingTicket,
        private _parkingLot: ParkingLot
    ) {
        this._currentState = this.idle;
    }
    
    public calculate() {
        this._amountDue = this._parkBilling.calculate(this._parkingTicket);
        this._currentState = this.waitingForPayment;

        return this._amountDue;
    }

    public insertCash(amount: number) {
        this._currentState.insertCash(amount);
    }
    
    public processPayment() {
        this._currentState.processPayment();
    }

    public setState(newState: IBillingState) {
        this._currentState = newState;
    }

    public amountDue() {
        return this._amountDue;
    }

    public parkingLot() {
        return this._parkingLot;
    }

    public parkingTicket() {
        return this._parkingTicket;
    }

    public get changeToReturn() {
        return this._changeToReturn;
    }

    public set changeToReturn(change: number) {
        this._changeToReturn = change;
    }

    public currentState() {
        return this._currentState;
    }

    public paymentIncomplete() {
        return (this.currentState instanceof WaitingForPayment);
    }

    public async onPaymentCompleted() {
        const vehicle = this.parkingTicket().getParkedVehicle();
        const result = await this.parkingLot().remove(vehicle);
        
        if(result.isError()) {
            throw new Error(result.error()!);
        }
        
        console.log(`=== Removing vehicle ===`);
        console.log(`name: ${vehicle.name()}`);
        console.log(`plate: ${vehicle.plate()}`);
    }
}