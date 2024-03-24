import { AxiosResponse } from "axios";
import {
  PaginationRequestParams,
  PaginationResult,
} from "../models/pagination";
import { GetRaceByIdResponse, RaceDto } from "../models/race";
import axiosInstance from "../api/axiosInstance";

const raceService = {
  getAllRaces: async (
    paginationRequestParams: PaginationRequestParams
  ): Promise<PaginationResult<RaceDto[]>> => {
    const response: AxiosResponse<PaginationResult<RaceDto[]>> =
      await axiosInstance.get(
        `/races?pageSize=${paginationRequestParams.pageSize}&pageNumber=${paginationRequestParams.pageNumber}`
      );

    if (response.data && Array.isArray(response.data.data)) {
      const modifiedData = response.data.data.map((race) => ({
        ...race,
        registrationEndDate:
          race.registrationEndDate?.slice(0, 19).replace("T", " ") ?? "",
        // lastUpdateDate:
        //   race.lastUpdateDate?.slice(0, 19).replace("T", " ") ?? "",
        // creationDate: race.creationDate?.slice(0, 19).replace("T", " ") ?? "",
        // startDateRace: race.startDateRace?.slice(0, 10) ?? "",
        // endDateRace: race.endDateRace?.slice(0, 10) ?? "",
      }));

      return {
        ...response.data,
        data: modifiedData,
      };
    } else {
      return {
        data: [],
        paginationParams: {
          totalItems: 0,
          totalPages: 0,
          currentPage: 0,
          itemsPerPage: 0,
        },
      };
    }
  },

  //   getRaces: async (): Promise<RaceDto[]> => {
  //     const response: AxiosResponse<GetRaces> = await axiosInstance.get(`/races`);
  //     const races = response.data.racesDto.map((race) => ({
  //       ...race,
  //       createDate: race.creationDate?.slice(0, 10) ?? "",
  //     }));
  //     return races;
  //   },

  getRaceById: async (raceId: number): Promise<RaceDto | undefined> => {
    const response = await axiosInstance.get<GetRaceByIdResponse>(
      `/races/${raceId}`
    );
    return response.data.raceDto;
  },

  createRace: async (race: RaceDto): Promise<void> => {
    await axiosInstance.post<number>(`/races`, race);
  },

  editRace: async (race: RaceDto): Promise<void> => {
    await axiosInstance.put<number>(`/races/${race.raceId}`, race);
  },

  deleteRace: async (raceId: number): Promise<void> => {
    await axiosInstance.delete<number>(`/races/${raceId}`);
  },
};

export default raceService;
