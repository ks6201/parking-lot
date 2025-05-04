import { describe, it, expect, vi } from "vitest";
import { Bus } from "../src/core/vehicle/impls/bus";
import { Car } from "../src/core/vehicle/impls/car";
import { ParkingTicket } from "../src/core/parking-ticket/parking-ticket";
import { ParkingManager } from "../src/core/parking-manager/parking-manager";
import { BillingMachine } from "../src/core/parking-billing/machine/billing-machine";
import { PaymentRecevied } from "../src/core/parking-billing/machine/states";

describe('Parking Entry', () => {
  const manager = ParkingManager.create();

  describe('Sequential Entry', () => {
    it('should allow sequential bus entry', async () => {
      const buses = [
        new Bus("Volvo", "7900 Electric", "VB1234"),
        new Bus("Mercedes-Benz", "Citaro", "MB5678"),
        new Bus("Scania", "Citywide", "SC9101"),
        new Bus("MAN", "Lion's City", "MN1122"),
        new Bus("BYD", "K9", "BY3344"),
        new Bus("Alexander Dennis", "Enviro500", "AD5566"),
        new Bus("New Flyer", "Xcelsior", "NF7788"),
        new Bus("Blue Bird", "All American", "BB9900"),
        new Bus("Gillig", "Low Floor", "GL2211"),
        new Bus("IC Bus", "CE Series", "IC4433"),
        new Bus("Setra", "S 531 DT", "ST6655"),
      ];

      for (let i = 0; i <= 10; ++i) {
        const entryResult = await manager.requestEntry(buses[i]);
        expect(entryResult.isError()).toBe(false);
        expect(entryResult.value()).toBeInstanceOf(ParkingTicket);
      }
    });
  });

  describe('Concurrent Entry', () => {
    it('should allow multiple cars to enter concurrently', async () => {
      const entryResults = await Promise.all([
        manager.requestEntry(new Car("Porche", "911", "XB74P1")),
        manager.requestEntry(new Car("Tesla", "Model 3", "XYZ123")),
        manager.requestEntry(new Car("BMW", "M4", "BM9876")),
        manager.requestEntry(new Car("Audi", "A4", "AU3456")),
        manager.requestEntry(new Car("Ford", "Mustang", "FM2345")),
        manager.requestEntry(new Car("Mercedes", "C-Class", "MB7654")),
        manager.requestEntry(new Car("Chevrolet", "Camaro", "CH1234")),
        manager.requestEntry(new Car("Nissan", "370Z", "NS5678")),
        manager.requestEntry(new Car("Honda", "Civic", "HN9876")),
        manager.requestEntry(new Car("Toyota", "Corolla", "TO4567")),
        manager.requestEntry(new Car("Jaguar", "F-Type", "JG8765")),
      ]);

      entryResults.forEach((result: any) => {
        expect(result.isError()).toBe(false);
        expect(result.value()).toBeInstanceOf(ParkingTicket);
      });
    });
  });
});


describe('Parking Exit', () => {
    it('should allow a car to exit after parking', async () => {
      const manager = ParkingManager.create();
      const entryResult = await manager.requestEntry(new Car("Jaguar", "F-Type", "JG8765"));
      expect(entryResult.isError()).toBe(false);
  
      const ticket = entryResult.value();
      const exitResult = await manager.requestExit(ticket!.getTicketId());
      expect(exitResult.isError()).toBe(false);
  
      const billingMachine = exitResult.value();
      expect(billingMachine).toBeInstanceOf(BillingMachine);
    });
});

describe('Billing Process', () => {
    it('should complete payment after inserting enough cash', async () => {
      const manager = ParkingManager.create();
      const entryResult = await manager.requestEntry(new Car("Jaguar", "F-Type", "JG8765"));
      expect(entryResult.isError()).toBe(false);
  
      const ticket = entryResult.value();
      const exitResult = await manager.requestExit(ticket!.getTicketId());
      expect(exitResult.isError()).toBe(false);
  
      const machine = exitResult.value()!;
      expect(machine).not.toBeNull();
  
      // Simulate inserting cash until payment received
      while (machine.paymentIncomplete()) {
        machine.insertCash(10);
      }
  
      expect(() => machine.processPayment()).not.toThrow();
    });

    it('should complete payment after forwarding time by 1.5 hours', async () => {
      vi.useFakeTimers();
  
      const manager = ParkingManager.create();
      const entryResult = await manager.requestEntry(new Car("Jaguar", "F-Type", "JG8765"));
      expect(entryResult.isError()).toBe(false);
  
      const ticket = entryResult.value();
      const exitResult = await manager.requestExit(ticket!.getTicketId());
      expect(exitResult.isError()).toBe(false);
  
      const machine = exitResult.value()!;
      expect(machine).not.toBeNull();
  
      // Forward time by 1.5 hours = 1 hour 30 minutes = 90 minutes
      // 90 minutes × 60 seconds × 1000 ms
      vi.advanceTimersByTime(90 * 60 * 1000);
  
      while (machine.paymentIncomplete()) {
        machine.insertCash(10);
      }
  
      expect(() => machine.processPayment()).not.toThrow();
  
      vi.useRealTimers();
    });
});