import { Profile } from "./profile";

export interface DistanceDto {
    distanceId: number; //?
    name: string;
    lengthInKilometers: number;
    description: string;
    availableSlots: number;
    totalSlots: number;
    price: number;
    distanceAttendees?: Profile[]
    //extra property
    isGoing?:boolean;
  }

//   export class DistanceDto implements IDistanceDto {
//     distanceId: number;
//     name: string;
//     lengthInKilometers: number;
//     description: string;
//     availableSlots: number;
//     totalSlots: number;
//     price: number;
//     isGoing: boolean;
//     distanceAttendees?: Profile[];

//     constructor(init: IDistanceDto) {
//         this.distanceId = init.distanceId;
//         this.name = init.name;
//         this.lengthInKilometers = init.lengthInKilometers;
//         this.description = init.description;
//         this.availableSlots = init.availableSlots;
//         this.totalSlots = init.totalSlots;
//         this.price = init.price;
//         this.isGoing = init.isGoing;
//         this.distanceAttendees = init.distanceAttendees;
//     }
// }

