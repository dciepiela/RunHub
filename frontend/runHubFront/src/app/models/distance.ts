import { Profile } from "./profile";

export interface IDistanceDto {
    distanceId?: number; //?
    name: string;
    lengthInKilometers: number;
    description: string;
    availableSlots: number;
    totalSlots: number;
    price: number;
    hostUsername?: string;
    distanceAttendees?: Profile[]
    //extra property
    isGoing:boolean;
    isReadyToShow?:boolean;
    registeredUser?:number;
    status?:DistanceStatus;
    date?:Date ;
  }

  export class DistanceDto implements IDistanceDto {
    distanceId?: number;
    name: string;
    lengthInKilometers: number;
    description: string;
    availableSlots: number;
    totalSlots: number;
    price: number;
    hostUsername?: string;
    distanceAttendees: Profile[] = [];
    isGoing: boolean = false
    isReadyToShow?:boolean;
    registeredUser?:number;
    status?: DistanceStatus;
    date?: Date;



    constructor(init: IDistanceDto) {
        this.distanceId = init.distanceId ;
        this.name = init.name;
        this.lengthInKilometers = init.lengthInKilometers;
        this.description = init.description;
        this.availableSlots = init.availableSlots;
        this.totalSlots = init.totalSlots;
        this.price = init.price;
        this.hostUsername = init.hostUsername
        // this.isGoing = init.isGoing;
        this.isReadyToShow = init.isReadyToShow;
        // this.distanceAttendees = init.distanceAttendees ?? [];
        this.registeredUser = init.registeredUser;
        this.status = init.status;
        this.date = init.date
    }
}


export enum DistanceStatus {
  Active, 
  Cancelled 
}

export const distanceStatusOptions = [
  { text: 'Aktywny', value: DistanceStatus.Active },
  { text: 'Odwołane', value: DistanceStatus.Cancelled },
];
