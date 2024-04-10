import { User } from "./user";

export interface IProfile {
    userName: string
    displayName: string
    firstName: string
    lastName: string
    gender: string
    club: string
    dateOfBirth: number | string | undefined;
    bio?: string
}

export class Profile implements IProfile{
    constructor(user:User){
        this.userName = user.userName!;
        this.displayName = user.displayName;
        this.firstName = user.firstName!;
        this.lastName = user.lastName!
        this.gender = user.gender!;
        this.club = user.club!;      
    }

    userName: string;
    displayName: string;
    firstName: string
    lastName: string
    gender: string
    club: string
    dateOfBirth: number | string | undefined;
    bio?: string
}