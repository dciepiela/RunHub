import { AddressDto } from "./address";

export type User = {
    email: string;
    userName?: string;
    displayName: string;
    token: string;
    role: string;
    image?: string;


    firstName?: string;
    lastName?: string;
    nationality?: string;
    gender?: string;
    dateOfBirth?: Date;
    contactNumber?: string;
    club?: string;
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
    dateOfBirth?: Date;
    contactNumber?: string;
    club?: string;
    addressDto?: AddressDto;
}

export interface ChangePasswordDto {
    currentPassword: string
    newPassword: string
  }

export interface ForgotPasswordDto {
    email:string;
}

export interface ResetPasswordDto {
    token: string;
    email: string;
    newPassword: string;
}

export interface ResetPasswordFormDto{
    password:string;
    confirmPassword:string;
}