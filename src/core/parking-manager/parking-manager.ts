import { Vehicle } from "../vehicle/vehicle";
import { ErrorOr } from "../../libs/error-or";
import { VehicleType } from "../vehicle/vehicle-types";
import { ParkingLot } from "../parking-lot/parking-lot";
import { ParkingTicket } from "../parking-ticket/parking-ticket";
import { CarParkingLot } from "../parking-lot/impls/car-parking-lot";
import { BusParkingLot } from "../parking-lot/impls/bus-parking-lot";
import { MotorCycleParkingLot } from "../parking-lot/impls/motocycle-parking-lot";
import { ParkingBillingFactory } from "../parking-billing/factory";
import { BillingMachine } from "../parking-billing/machine/billing-machine";


export class ParkingManager {
    private static _instance: ParkingManager;

    private billingFactory = new ParkingBillingFactory();
    private _vechicleParkingTicketMap = new Map<string, ParkingTicket>();
    private _vehicleTypeToParkingLotMap: Map<VehicleType, ParkingLot> = new Map<VehicleType, ParkingLot>(); 

    private constructor(
        parkingLots: ParkingLot[]
    ) {
        const floorAssignmentTracker = new Set<number>();
        for(const parkingLot of parkingLots) {
            const [from, to] = parkingLot.getFloorRange();
            if(
                floorAssignmentTracker.has(from) ||
                floorAssignmentTracker.has(to)
            ) {
                throw new Error(`Floor re-assignment found for '${parkingLot.vehicleType()}' type.`)
            }
            
            floorAssignmentTracker.add(from);
            floorAssignmentTracker.add(to);
            this._vehicleTypeToParkingLotMap.set(parkingLot.vehicleType(), parkingLot);
        }
    }

    async requestEntry(
        vehicle: Vehicle
    ): Promise<ErrorOr<ParkingTicket>> {
        const parkingLot = this._vehicleTypeToParkingLotMap.get(vehicle.type());

        if(!parkingLot) {
            throw new Error(`Parking lot for vehicle type not found: '${vehicle.type()}'`);
        }
        
        const result: ErrorOr<ParkingTicket> = await parkingLot.redirectTraffic(vehicle);

        if(result.isError()) {
            return result;
        }
        
        const ticket = result.value()!;

        ticket.print();
        this._vechicleParkingTicketMap.set(ticket.getTicketId(), ticket);

        return ErrorOr.makeValue(ticket);
    }
    
    async requestExit(
        ticketId: string
    ): Promise<ErrorOr<BillingMachine>> {
        const parkingTicket = this._vechicleParkingTicketMap.get(ticketId);
       
        if(!parkingTicket) {
            throw new Error();
        }
        
        const vehicle = parkingTicket.getParkedVehicle();

        const parkingLot = this._vehicleTypeToParkingLotMap.get(vehicle.type());

        if(!parkingLot) {
            return ErrorOr.makeError(`Unkown vehicle type '${vehicle.type()}'`);
        }

        const biller = this.billingFactory.create(vehicle.type());

        const machine = new BillingMachine(
            biller,
            parkingTicket,
            parkingLot
        );

        const cost = machine.calculate();

        console.log(`Parking Fee: ${cost}`);

        return ErrorOr.makeValue(machine);
    }

    public static create(): ParkingManager {
        if(!ParkingManager._instance) {
            ParkingManager._instance = new ParkingManager([
                new BusParkingLot([1, 5]),
                new CarParkingLot([6, 10]),
                new MotorCycleParkingLot([11, 20])
            ]);
        }

        return ParkingManager._instance;
    }
}