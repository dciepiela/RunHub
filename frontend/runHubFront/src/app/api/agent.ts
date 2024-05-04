import axios, { AxiosError, AxiosResponse } from "axios";
import { DistanceDto } from "../models/distance";
import { PaginatedResult } from "../models/pagination";
import { RaceDto, RaceFormValues } from "../models/race";
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  User,
  UserFormLogin,
  UserFormRegister,
} from "../models/user";
import { DistanceAttendee } from "../models/distanceAttendee";
import { store } from "../stores/store";
import { router } from "../routes/Router";
import { toast } from "react-toastify";
import { Photo, Profile, UserDistance } from "../models/profile";
import { SponsorDto } from "../models/sponsor";
import { Result } from "../models/result";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    // await sleep(500);
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResult(
        response.data,
        JSON.parse(pagination)
      );
      return response as AxiosResponse<PaginatedResult<unknown>>;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (
          config.method === "get" &&
          Object.prototype.hasOwnProperty.call(data.errors, "id")
        ) {
          router.navigate("/not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("Błędne dane");
        break;
      case 403:
        toast.error("Zakazane");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 405:
        toast.error("Zakazane");
        break;
      case 500:
        store.commonStore.setServerError(data);
        router.navigate("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) =>
    axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: UserFormLogin) => requests.post<User>("/account/login", user),
  googleLogin: (idToken: string) =>
    requests.post<User>(`/account/googleLogin?idToken=${idToken}`, {}),
  registerCompetitor: (user: UserFormRegister) =>
    requests.post<User>("account/registerCompetitor", user),
  registerOrganizer: (user: UserFormRegister) =>
    requests.post<User>("account/registerOrganizer", user),
  changePassword: (changePasswordDto: ChangePasswordDto) =>
    requests.post<void>(`account/changePassword`, changePasswordDto),
  forgotPassword: (forgotPasswordDto: ForgotPasswordDto) =>
    requests.post<void>("/account/forgotPassword", forgotPasswordDto),
  resetPassword: (resetPasswordDto: ResetPasswordDto) =>
    requests.post<void>("/account/resetPassword", resetPasswordDto),
};

const Races = {
  allRaces: (params: URLSearchParams) =>
    axios
      .get<PaginatedResult<RaceDto[]>>(`/races`, { params })
      .then(responseBody),
  allHostingRaces: () => requests.get<RaceDto[]>(`/races/isHost`),
  details: (raceId: number) => requests.get<RaceDto>(`/races/${raceId}`),
  create: (race: RaceFormValues) => requests.post<number>(`/races/`, race),
  updateRace: (raceId: number, race: RaceFormValues) =>
    requests.put<void>(`/races/${raceId}`, race),
  delete: (raceId: number) => requests.delete<void>(`/races/${raceId}}`),
  updateSponsor: (raceId: number, sponsorId: number, sponsorData: SponsorDto) =>
    requests.put(`/races/${raceId}/sponsor/${sponsorId}`, sponsorData),
  uploadPhoto: (raceId: number, file: Blob) => {
    const formData = new FormData();
    formData.append("File", file);
    return axios.post<Photo>(`photos/${raceId}/photoRace`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  deletePhoto: (id: string) => requests.delete(`/photos/${id}`),
  changeStatus: (raceId: number, status: number) =>
    axios.put<void>(`/races/${raceId}/status/${status}`),
};

const Distances = {
  allExistDistances: () => requests.get<DistanceDto[]>("/distances"),
  allDistances: () => requests.get<DistanceDto[]>("/distances/2"),
  allDistancesForRace: (raceId: number) =>
    requests.get<DistanceDto[]>(`/distances/${raceId}`),
  details: (raceId: number, distanceId: number) =>
    requests.get<DistanceDto>(`/distances/${raceId}/${distanceId}`),
  create: (raceId: number, distance: DistanceDto) =>
    requests.post<void>(`/distances/${raceId}`, distance),
  update: (
    raceId: number,
    distanceId: number,
    distanceData: Partial<DistanceDto>
  ) => requests.put(`/distances/${raceId}/${distanceId}`, distanceData),
  delete: (raceId: number, distanceId: number) =>
    requests.delete<void>(`/distances/${raceId}/${distanceId}`),
  allAttendees: (raceId: number, distanceId: number) =>
    axios
      .get<DistanceAttendee[]>(`/distances/${raceId}/${distanceId}/attendees`)
      .then(responseBody),
  attendWithPayment: (
    raceId: number,
    distanceId: number,
    paymentDetails: { stripeToken: string; amount: number }
  ) => {
    return requests.post<void>(
      `/distances/${raceId}/${distanceId}/attendWithPayment`,
      paymentDetails
    );
  },
  manualRegistration: (
    raceId: number,
    distanceId: number,
    registrationData: any
  ) => {
    return requests.post<void>(
      `/distances/${raceId}/${distanceId}/attendManually`,
      registrationData
    );
  },
  toggleIsReadyToShow: (distanceId: number, isReadyToShow: boolean) => {
    return requests.put<void>(`/distances/${distanceId}/show`, {
      isReadyToShow,
    });
  },
  generateDistanceIncomeReport: (distanceId: number) => {
    return requests.post<void>(
      `/distances/${distanceId}/generateReportIncome`,
      {}
    );
  },
};

const Profiles = {
  get: (userName: string) => requests.get<Profile>(`/profiles/${userName}`),
  uploadPhoto: (file: Blob) => {
    const formData = new FormData();
    formData.append("File", file);
    return axios.post<Photo>("photos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  deletePhoto: (id: string) => requests.delete(`/photos/${id}`),
  updateProfile: (profile: Partial<Profile>) =>
    requests.put(`/profiles`, profile),
  listDistances: (userName: string, predicate: string) =>
    requests.get<UserDistance[]>(
      `/profiles/${userName}/distances?predicate=${predicate}`
    ),
  updateProfileAfterGoogleLogin: (profile: Partial<Profile>) =>
    requests.put(`/profiles/afterGoogleLogin`, profile),
};

const Results = {
  resultsForDistance: (distanceId: number) => {
    return requests.get<Result[]>(`/results/distance/${distanceId}`);
  },
  update: (resultId: number, field: string, value: any) => {
    return requests.put<void>(`/results/update/${resultId}`, {
      [field]: value,
    });
  },
  delete: (resultId: number) => requests.delete<void>(`/results/${resultId}`),
};

const Sponsors = {
  listForRace: (raceId: number) =>
    requests.get<SponsorDto[]>(`/races/${raceId}/sponsors`),
  details: (raceId: number, sponsorId: number) =>
    requests.get<SponsorDto>(`/races/${raceId}/sponsors/${sponsorId}`),
  update: (raceId: number, sponsorId: number, sponsor: SponsorDto) =>
    requests.put<void>(`/races/${raceId}/sponsor/${sponsorId}`, sponsor),
  create: (raceId: number, sponsorData: SponsorDto) =>
    requests.post<SponsorDto>(`/races/${raceId}/sponsor`, sponsorData),
  delete: (raceId: number, sponsorId: number) =>
    requests.delete<void>(`/races/${raceId}/sponsor/${sponsorId}`),
};

const agent = {
  Account,
  Races,
  Distances,
  Profiles,
  Results,
  Sponsors,
};

export default agent;
