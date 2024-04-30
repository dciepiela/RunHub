import { makeAutoObservable, runInAction } from "mobx";
import { RaceDto, RaceFormValues } from "../models/race";
import agent from "../api/agent";
import { Pagination, PagingParams } from "../models/pagination";
import { store } from "./store";
import { Photo, Profile } from "../models/profile";
import { DistanceDto } from "../models/distance";
import { router } from "../routes/Router";
import { AddressDto } from "../models/address";

export default class RaceStore {
  raceRegistry = new Map<number, RaceDto>();
  distanceRegistry = new Map<number, DistanceDto>();
  selectedRace: RaceDto | undefined = undefined;
  selectedDistance: DistanceDto | undefined = undefined;
  selectedAddress: AddressDto | undefined = undefined;

  loading = false;
  loadingInitial = false;

  pagination: Pagination | null = null;
  pagingParams = new PagingParams();

  constructor() {
    makeAutoObservable(this);
  }

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("PageNumber", this.pagingParams.pageNumber.toString());
    params.append("PageSize", this.pagingParams.pageSize.toString());
    return params;
  }

  get racesByDate() {
    return Array.from(this.raceRegistry.values()).sort(
      (a, b) => a.startDateRace!.getTime() - b.startDateRace!.getTime()
    );
  }

  get races() {
    return Array.from(this.raceRegistry.values());
  }

  get hostRaces() {
    const user = store.userStore.user;

    if (!user) return []; // Return empty array if user is not logged in

    // Filter races where the current user is the host
    console.log(user.userName);
    return this.races.filter((race) => race.hostUsername == user.userName);
  }

  get threeRaces() {
    const sortedRaces = this.racesByDate;

    if (sortedRaces.length <= 3) {
      return sortedRaces;
    }

    return sortedRaces.slice(0, 3);
  }

  loadRaces = async () => {
    this.loadingInitial = true;
    try {
      const result = await agent.Races.allRaces(this.axiosParams);
      runInAction(() => {
        this.raceRegistry.clear();
        result.data.forEach((race) => {
          this.setRace(race);
        });
        this.setPagination(result.pagination);
        this.loadingInitial = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };

  loadHostingRaces = async () => {
    this.loadingInitial = true;
    try {
      const hostingRaces = await agent.Races.allHostingRaces();
      runInAction(() => {
        this.raceRegistry.clear();
        hostingRaces.forEach((race) => {
          this.setRace(race);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  loadRace = async (id: number) => {
    let race = this.getRace(id);
    if (race) {
      this.selectedRace = race;
      return race;
    } else {
      this.loadingInitial = true;
      try {
        race = await agent.Races.details(id);
        runInAction(() => {
          this.setRace(race!);
          this.loadingInitial = false;
        });
        return race;
      } catch (error) {
        console.log(error);
        runInAction(() => {
          this.loadingInitial = false;
        });
      }
    }
  };

  private setRace = (race: RaceDto) => {
    const user = store.userStore.user;
    if (!race.raceId) {
      return;
    }

    if (user) {
      race.isHost = race.hostUsername === user?.userName;

      race.host = new Profile({
        userName: race.host?.userName,
        displayName: user?.displayName,
        firstName: user?.firstName,
        lastName: user?.lastName,
        gender: user?.gender,
        dateOfBirth: user?.dateOfBirth,
        club: user?.club,
        image: user?.image,
      });
    }

    const GMT_OFFSET = 2 * 60 * 60 * 1000; // Convert hours to milliseconds
    race.registrationEndDate = new Date(race.registrationEndDate!);
    race.startDateRace = new Date(race.startDateRace!);
    race.endDateRace = new Date(race.endDateRace!);

    this.getPhoto(race.raceId);

    // Adding the GMT+2 offset
    race.registrationEndDate.setTime(
      race.registrationEndDate.getTime() + GMT_OFFSET
    );
    race.startDateRace.setTime(race.startDateRace.getTime() + GMT_OFFSET);
    race.endDateRace.setTime(race.endDateRace.getTime() + GMT_OFFSET);
    // this.selectedRace = race;
    this.raceRegistry.set(race.raceId, race);
  };

  private getRace = (id: number) => {
    return this.raceRegistry.get(id);
  };

  createRace = async (race: RaceFormValues): Promise<number> => {
    const user = store.userStore.user;
    try {
      const newRaceId = await agent.Races.create(race);
      const newRace = new RaceDto(race);
      newRace.hostUsername = user!.userName!;
      this.setRace(newRace);
      runInAction(() => {
        this.selectedRace = newRace;
        router.navigate(`/races/${newRaceId}`);
      });
      return newRaceId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  uploadPhoto = async (raceId: number, file: Blob) => {
    this.loading = true;
    try {
      const response = await agent.Races.uploadPhoto(raceId, file);
      const photo = response.data as Photo;
      runInAction(() => {
        if (this.selectedRace && this.selectedRace.raceId === raceId) {
          this.selectedRace.photo = photo;
          this.setRace({ ...this.selectedRace });
        }
        this.loading = false;
      });
    } catch (error) {
      console.error(error);
      runInAction(() => (this.loading = false));
    }
  };

  deletePhoto = async (photoId: string) => {
    this.loading = true;
    try {
      await agent.Races.deletePhoto(photoId);
      runInAction(() => {
        if (
          this.selectedRace &&
          this.selectedRace.photo &&
          this.selectedRace.photo.id === photoId
        ) {
          this.selectedRace.photo = null;
        }
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
        console.error(error);
      });
    }
  };

  getPhoto = async (raceId: number) => {
    let race = this.getRace(raceId);
    if (race && race.photo) {
      return race.photo;
    } else {
      this.loadingInitial = true;
      try {
        race = await agent.Races.details(raceId);
        runInAction(() => {
          if (race) {
            this.setRace(race);
          }
          this.loadingInitial = false;
        });
        return race?.photo;
      } catch (error) {
        console.error(error);
        runInAction(() => {
          this.loadingInitial = false;
        });
        return null;
      }
    }
  };

  setImage = (image: string) => {
    if (this.selectedRace) {
      this.selectedRace.photo!.url = image;
    }
  };

  updateRace = async (raceId: number, raceData: RaceFormValues) => {
    try {
      const updatedRace = await agent.Races.updateRace(raceId, raceData);
      runInAction(() => {
        if (this.raceRegistry.has(raceId)) {
          const existingRace = this.raceRegistry.get(raceId);
          this.distanceRegistry.set(raceId, {
            ...existingRace,
            ...updatedRace,
          });
        }
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  deleteRace = async (id: number) => {
    try {
      await agent.Races.delete(id);
      runInAction(() => {
        this.raceRegistry.delete(id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  selectDistance = (distanceId: number) => {
    if (!this.selectedRace) return;

    const distance = this.selectedRace.distances?.find(
      (d) => d.distanceId === distanceId
    );
    runInAction(() => {
      this.selectedDistance = distance;
    });
  };

  updateRaceStatus = async (raceId: number, status: number) => {
    try {
      await agent.Races.changeStatus(raceId, status);
      runInAction(() => {
        const race = this.raceRegistry.get(raceId);
        if (race) {
          race.status! = status;
          this.raceRegistry.set(raceId, race);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
}
