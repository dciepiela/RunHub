export interface Result {
    resultId: number;
    userId: string;
    distanceId: number;
    time: string;  // Use string if you handle it as a string initially
    date: string;  // Use string for simplicity in this example
    place: number;
    placeGender: number;
    firstName: string;
    lastName: string;
    club:string;
    gender: string;
    isReadyToShow?: boolean;
}