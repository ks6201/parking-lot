import { Car } from "./src/core/vehicle/impls/car";
import { Bus } from "./src/core/vehicle/impls/bus";
import { ParkingManager } from "./src/core/parking-manager/parking-manager";
import { BillingMachine } from "./src/core/parking-billing/machine/billing-machine";
import { MotorCycle } from "./src/core/vehicle/impls/motorcycle";
import { PaymentRecevied } from "./src/core/parking-billing/machine/states";

async function handleBilling(machine: BillingMachine) {
    while (machine.paymentIncomplete()) {
      machine.insertCash(10);
    }
    machine.processPayment();
}

const manager = ParkingManager.create();

// Create Vehicles
const car = new Car("Tesla", "Model S", "CAR123");
const bus = new Bus("Volvo", "B9TL", "BUS456");
const bike = new MotorCycle("Yamaha", "YZF-R1", "BIKE789");

// Entry
const carTicketResult = await manager.requestEntry(car);

const busTicketResult = await manager.requestEntry(bus);
const bikeTicketResult = await manager.requestEntry(bike);

if (carTicketResult.isError() || busTicketResult.isError() || bikeTicketResult.isError()) {
  throw new Error("Failed to park a vehicle.");
}

console.log("Vehicles entered successfully!");

// Exit and Billing Process

// Exit Car
const carExitResult = await manager.requestExit(carTicketResult.value()!.getTicketId());
if (carExitResult.isError()) throw new Error(carExitResult.error()!);
await handleBilling(carExitResult.value()!);
console.log("Car exited successfully!");

// Exit Bus
const busExitResult = await manager.requestExit(busTicketResult.value()!.getTicketId());
if (busExitResult.isError()) throw new Error(busExitResult.error()!);
await handleBilling(busExitResult.value()!);
console.log("Bus exited successfully!");

// Exit Bike
const bikeExitResult = await manager.requestExit(bikeTicketResult.value()!.getTicketId());
if (bikeExitResult.isError()) throw new Error(bikeExitResult.error()!);
await handleBilling(bikeExitResult.value()!);
console.log("Bike exited successfully!");