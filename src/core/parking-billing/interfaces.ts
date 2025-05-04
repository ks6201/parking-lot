export interface IBillingState {
    processPayment(): void;
    insertCash(amount: number): void;
}