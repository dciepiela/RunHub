import { User } from "./user";

export interface IProfile {
    userName?: string
    displayName?: string
    image?: string
    firstName?: string
    lastName?: string
    gender?: string
    club?: string
    dateOfBirth?: number | undefined;
    bio?: string
    photo?:Photo | null;

}

export class Profile implements IProfile{
    constructor(user: Partial<User>){
        this.userName = user.userName;
        this.displayName = user.displayName;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.gender = user.gender;
        this.dateOfBirth = user.dateOfBirth ? user.dateOfBirth.getFullYear() : undefined;
        this.club = user.club;
        this.image = user.image      
    }

    userName?: string
    displayName?: string
    image?: string
    firstName?: string
    lastName?: string
    gender?: string
    club?: string
    dateOfBirth?: number | undefined;
    bio?: string
    photo?:Photo | null;

}

export interface Photo{
    id:string;
    url: string;
}


export interface UserDistance{
    distanceId: string;
    raceId: string;
    image: string;
    name: string;
    date: Date;
    raceType: string;
    hostUsername: string;
}