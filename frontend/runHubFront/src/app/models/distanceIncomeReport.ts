export interface DistanceIncomeReportDto {
    distanceId: number;
    name: string;
    lengthInKilometers: number;
    price: number; // Using number for decimal type in TypeScript
    totalAttendees: number;
    totalIncome: number;
    attendees: DistanceAttendeeForReportDto[];
}

interface DistanceAttendeeForReportDto{
    firstName:string;
    lastName:string;
    gender:string;
    club?:string;
    dateOfBirth:string;
}