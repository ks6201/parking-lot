import { type IBillingState } from "../interfaces";
import { BillingMachine } from "./billing-machine";

export class Idle implements IBillingState {

    constructor(
        private _billingMachine: BillingMachine
    ){};

    insertCash(_amount: number): void {
        console.log(`Cannot accpet cash in Idle state.`);
    }

    processPayment(): void {
        console.log(`Cannot process payment in Idle state.`);
    }
}

export class WaitingForPayment implements IBillingState {
    private _totalAmount: number = 0;
    constructor(
        private billingMachine: BillingMachine
    ) {};
    
    insertCash(amount: number): void {
        if(amount < 0 || isNaN(amount)) {
            return console.log('Invalid denomination.');
        }

        console.log(`Inserted ${amount}`);

        this._totalAmount += amount;
        if(this._totalAmount >= this.billingMachine.amountDue()) {
            const change = this._totalAmount - this.billingMachine.amountDue();
            this.billingMachine.changeToReturn = change;

            this.billingMachine.setState(this.billingMachine.paymentRecevied);
        }
    }

    processPayment(): void {
        console.log(
            'Cannot process payment in WaitingForPayment state, waiting for payment to complete.'
        );
    }
}

export class PaymentRecevied implements IBillingState {
    private _change: number = 0;
    constructor(
        private billingMachine: BillingMachine
    ) {};
    
    insertCash(_amount: number): void {
        console.log('Payment already recevied.');
    }

    processPayment(): void {
        if(this.billingMachine.changeToReturn > 0) {
            console.log(`Change returning: $${this.billingMachine.changeToReturn}.`);
        }

        this.billingMachine.setState(this.billingMachine.paymentRecevied);
        this.billingMachine.onPaymentCompleted();
    }
}