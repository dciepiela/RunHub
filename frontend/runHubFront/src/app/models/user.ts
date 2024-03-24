import { AddressDto } from "./address";

export type User = {
    email: string;
    password: string
}
export type UserProfileToken = {
    userName: string;
    displayName: string;
    token: string;
    role: string;
}

export type UserFormLogin = {
    email:string;
    password:string;
}

export type UserProfile ={
    email?:string;
    userName: string;
    displayName:string;
    role:string;
}

export type UserFormRegister = {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    firstName?: string;
    lastName?: string;
    nationality?: string;
    gender?: string;
    dateOfBirth?: string;
    contactNumber?: string;
    club?: string;
    addressDto?: AddressDto;
}