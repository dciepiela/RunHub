import { AddressDto } from "./address";
import { DistanceDto } from "./distance";
import { SponsorDto } from "./sponsor";


export interface RaceDto{
    raceId: number | undefined,
    name: string,
    description: string,
    creationDate?: string ,
    lastUpdateDate?: string ,
    registrationEndDate?: string,
    startDateRace?: string,
    endDateRace?: string,
    image: string,
    raceStatus?: number,
    raceType?: number,
    creatorAppUserId?: string;
    addressId?: number;
    addressDto?: AddressDto;
    distances?: DistanceDto[];
    sponsors?: SponsorDto[];
}

export interface GetRaces {
    racesDto: RaceDto[];
}

export interface GetRaceByIdResponse {
    raceDto: RaceDto;
}

export const raceTypeOptions = [
    {text:'Bieg górski', value:1},
    {text:'Bieg uliczny', value:2},
    {text:'Bieg przeszkodowy (OCR)', value:3},
    {text:'Bieg ultra', value:4},
    {text:'Bieg trailowy', value:5},
    {text:'Inny', value:6},
]


export const raceStatusOptions = [
    {text:'Rejestracja otwarta', value: 1},
    {text:'Zamknięta rejestracja', value: 2},
    {text:'Odbyte', value: 3},
    {text:'Odwołane', value: 4},
    {text:'W trakcie', value: 5},
]

