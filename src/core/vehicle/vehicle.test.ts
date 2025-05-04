import { Car } from "./impls/car";
import { Bus } from "./impls/bus";
import type { Vehicle } from "./vehicle";
import { VehicleFactory } from "./factory";
import { describe, expect, it } from "vitest";
import { VehicleType } from "./vehicle-types";
import { MotorCycle } from "./impls/motorcycle";
import { Configs } from "../../configs";

describe("Vehicle", () => {

    it("Should create MotorCycle instance with the vehicle-factory", () => {
        const name = "BMW"; 
        const model = "SR1000RR";
        const plate = "DL 5S BK 6781";

        const factory = new VehicleFactory();
        
        const vehicle: Vehicle = factory.create(
            name,
            model,
            plate,
            VehicleType.MotorCycle
        );

        expect(vehicle).toBeInstanceOf(MotorCycle);

        expect(typeof vehicle.id()).toBe("string");
        expect(vehicle.id()).toHaveLength(Configs.ID_LENGTH);
        expect(vehicle.name()).toBe(name);
        expect(vehicle.model()).toBe(model);
        expect(vehicle.plate()).toBe(plate);
        expect(vehicle.type()).toBe(VehicleType.MotorCycle)
    });

    it("Should create Car instance with the vehicle-factory", () => {
        const name = "Porsche"; 
        const model = "911 Turbo S";
        const plate = "MH 12 AB 4567";
        
        const factory = new VehicleFactory();
        
        const vehicle: Vehicle = factory.create(
            name,
            model,
            plate,
            VehicleType.Car
        );

        expect(vehicle).toBeInstanceOf(Car);

        expect(typeof vehicle.id()).toBe("string");
        expect(vehicle.id()).toHaveLength(Configs.ID_LENGTH);
        expect(vehicle.name()).toBe(name);
        expect(vehicle.model()).toBe(model);
        expect(vehicle.plate()).toBe(plate);
        expect(vehicle.type()).toBe(VehicleType.Car)
    });

    it("Should create Bus instance with the vehicle-factory", () => {
        const name = "Mercedes-Benz"; 
        const model = "Travego";
        const plate = "KA 01 FA 9023";
        
        const factory = new VehicleFactory();
        
        const vehicle: Vehicle = factory.create(
            name,
            model,
            plate,
            VehicleType.Bus
        );

        expect(vehicle).toBeInstanceOf(Bus);

        expect(typeof vehicle.id()).toBe("string");
        expect(vehicle.id()).toHaveLength(Configs.ID_LENGTH);
        expect(vehicle.name()).toBe(name);
        expect(vehicle.model()).toBe(model);
        expect(vehicle.plate()).toBe(plate);
        expect(vehicle.type()).toBe(VehicleType.Bus)
    });
});