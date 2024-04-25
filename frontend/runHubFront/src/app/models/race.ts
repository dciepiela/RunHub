import { AddressDto } from "./address";
import { DistanceDto } from "./distance";
import { Photo, Profile } from "./profile";
import { SponsorDto } from "./sponsor";


export interface IRaceDto{
  raceId: number,
  name: string,
  description: string,
  registrationEndDate: Date | null,
  startDateRace: Date | null,
  endDateRace: Date | null,

  raceStatus?: RaceStatus,
  raceType?: RaceType,
  hostUsername: string,
  addressId?: number,
  addressDto?: AddressDto,
  distances?: DistanceDto[],
  sponsors?: SponsorDto[],
  //extra property
  isHost?:boolean,
  host?:Profile,
  photo?:Photo | null;
  status:number;
}

export class RaceDto implements IRaceDto {
  constructor(init: RaceFormValues) {
    this.raceId = init.raceId || 0;
    this.name = init.name || '';
    this.description = init.description || '';
    this.registrationEndDate = init.registrationEndDate || null;
    this.startDateRace = init.startDateRace || null;
    this.endDateRace = init.endDateRace || null;
    this.hostUsername = init.hostUsername || "";
    this.image = init.image || '';
    this.raceStatus = init.raceStatus || 1;
    this.raceType = init.raceType || 1;
    this.addressDto = { ...(init.addressDto || {}) };
    this.distances = init.distances ? init.distances.map(distance => ({ ...distance })) : [];
    this.sponsors = init.sponsors ? init.sponsors.map(sponsor => ({ ...sponsor })) : [];
  }

  raceId: number;
  name: string;
  description: string;
  registrationEndDate: Date | null;
  startDateRace: Date | null;
  endDateRace: Date | null;
  image?: string;
  raceStatus?: RaceStatus;
  raceType?: RaceType;
  hostUsername: string;
  addressDto?: AddressDto;
  distances?: DistanceDto[] = [];
  sponsors?: SponsorDto[] = [];
  isHost?: boolean = false;
  status: number = 0;
  host?: Profile;
  photo?:Photo | null;

}

export class RaceFormValues {
  raceId?: number;
  name: string = '';
  description: string = '';
  registrationEndDate: Date | null = null;
  startDateRace: Date | null = null;
  endDateRace: Date | null = null;
  image: string = '';
  hostUsername: string = '';
  raceStatus: RaceStatus = RaceStatus.RegistrationOpen;
  raceType: RaceType = RaceType.Street;
  addressDto: AddressDto = {
    city: '',
    street: '',
    postalCode: '',
  };
  distances: DistanceDto[] = [];
  sponsors: SponsorDto[] = [];

  constructor(init?: RaceFormValues) {
    if (init) {
      Object.assign(this, init);
      this.distances = init.distances.map(distance => ({ ...distance }));
      this.sponsors = init.sponsors.map(sponsor => ({ ...sponsor }));
      // this.distances = init.distances || [];
      // this.sponsors = init.sponsors || [];
    }
  }
}

export enum RaceType {
    Mountain = 1,
    Street = 2,
    OCR = 3,
    Ultra = 4,
    Trail = 5,
    Other = 6,
}

export enum RaceStatus {
    RegistrationOpen = 1,
    RegistrationClosed = 2,
    Completed = 3,
    Cancelled = 4,
    InProgress = 5,
}

export const raceTypeOptions = [
    { text: 'Bieg górski', value: RaceType.Mountain },
    { text: 'Bieg uliczny', value: RaceType.Street },
    { text: 'OCR', value: RaceType.OCR },
    { text: 'Bieg ultra', value: RaceType.Ultra },
    { text: 'Bieg trailowy', value: RaceType.Trail },
    { text: 'Inny', value: RaceType.Other },
];

export const raceStatusOptions = [
    { text: 'Rejestracja otwarta', value: RaceStatus.RegistrationOpen },
    { text: 'Zamknięta rejestracja', value: RaceStatus.RegistrationClosed },
    { text: 'Odbyte', value: RaceStatus.Completed },
    { text: 'Odwołane', value: RaceStatus.Cancelled },
    { text: 'W trakcie', value: RaceStatus.InProgress },
];


export interface CreateRacePhotoDto {
  Name?: string;
  Description?: string;
  RegistrationEndDate?: Date | null;
  StartDateRace?: Date | null;
  EndDateRace?: Date | null;
  Image: string;
  RaceStatus: RaceStatus;
  RaceType: RaceType;
  AddressDto?: AddressDto;
  Distances?: DistanceDto[];
  Sponsors?: SponsorDto[];
  imageFile: File;

}