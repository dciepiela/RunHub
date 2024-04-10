import { User } from "./user"

export interface IDistanceAttendee {
    userName:string
    participatorFirstName?: string
    participatorLastName?: string
    isPaid?: boolean
    paidDate?: string
    price?: number
  }

export class DistanceAttendee implements IDistanceAttendee{
    constructor(user:User){
        this.userName = user.userName;
        this.participatorFirstName = user.firstName;
        this.participatorLastName = user.lastName;
    }

    userName:string
    participatorFirstName?: string
    participatorLastName?: string
    isPaid?: boolean
    paidDate?: string
    price?: number
}