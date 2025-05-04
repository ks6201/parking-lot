import { SecId } from "@d3vtool/secid";
import type { IVehicleType } from "./interfaces";
import type { VehicleType } from "./vehicle-types";
import { Configs } from "../../configs";

export abstract class Vehicle implements IVehicleType {
    private _id: string = SecId.generate(Configs.ID_LENGTH);

    constructor(
        private _name: string,
        private _model: string,
        private _plate: string,
        private _type: VehicleType,
    ) {};

    public id() {
        return this._id;
    }

    public name(): string {
        return this._name;
    }

    public plate(): string {
        return this._plate;
    }

    public model(): string {
        return this._model;
    }

    public type(): VehicleType {
        return this._type;
    }
}