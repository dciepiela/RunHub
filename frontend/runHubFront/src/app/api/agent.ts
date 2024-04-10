import axios, { AxiosError, AxiosResponse } from "axios";
import { DistanceDto } from "../models/distance";
import { PaginatedResult } from "../models/pagination";
import { RaceDto, RaceFormValues } from "../models/race";
import { User, UserFormLogin, UserFormRegister } from "../models/user";
import { DistanceAttendee } from "../models/distanceAttendee";
import { store } from "../stores/store";
import { router } from "../routes/Router";
import { toast } from "react-toastify";
import { Profile } from "../models/profile";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = "http://localhost:5000/api"

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response =>{
    await sleep(1000);
    const pagination = response.headers["pagination"];
    if(pagination){
        response.data = new PaginatedResult(response.data, JSON.parse(pagination))
        return response as AxiosResponse<PaginatedResult<unknown>>
    }
    return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response as AxiosResponse;
    switch(status) {
        case 400:
            if(config.method === 'get' && Object.prototype.hasOwnProperty.call(data.errors, 'raceId')){
                router.navigate('/not-found')
            }
            if(data.errors){
                const modalStateErrors = [];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else{
                toast.error(data);
            }
            break;
        case 401:
            toast.error('Brak autoryzacji')
            break;
        case 403:
            toast.error('Zakazane')
            break;
        case 404:
            router.navigate('/not-found')
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;    
    }
    return Promise.reject(error);
})

const responseBody = <T> (response:AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url:string) => axios.get<T>(url).then(responseBody),
    post:<T> (url:string, body: object) => axios.post<T>(url, body).then(responseBody),
    put:<T> (url:string, body: object) => axios.put<T>(url, body).then(responseBody),
    delete:<T> (url:string) => axios.delete<T>(url).then(responseBody),
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user:UserFormLogin) => requests.post<User>('/account/login', user),
    registerCompetitor: (user:UserFormRegister) => requests.post<User>('account/registerCompetitor', user),
    registerOrganizer: (user:UserFormRegister) => requests.post<User>('account/registerOrganizer', user),
}

const Races = {
    allRaces: (params: URLSearchParams) => axios.get<PaginatedResult<RaceDto[]>>( `/races`,{params}).then(responseBody),
    details: (raceId:number) => requests.get<DistanceDto>(`/races/${raceId}`),
    create: (race:RaceFormValues) => requests.post<number>(`/races/`, race),
    update: (race:RaceFormValues) => requests.put<void>(`/races/${race.raceId}`, race),
    delete: (raceId:number) => requests.delete<void>(`/races/${raceId}}`),
    updateDistance: (raceId:number, distanceId:number, distanceData:DistanceDto) =>
        requests.put(`/distances/${raceId}/${distanceId}`, distanceData)
}

const Distances = {
    allDistances: () => requests.get<DistanceDto[]>('/distances/2'),
    details: (raceId:number, distanceId:number) => requests.get<DistanceDto>(`/distances/${raceId}/${distanceId}`),
    create: (raceId:number, distance:DistanceDto) => requests.post<void>(`/distances/${raceId}`, distance),
    update: (raceId:number, distance:DistanceDto) => requests.put<void>(`/distances/${raceId}/${distance.distanceId}`, distance),
    delete: (raceId:number, distanceId:number) => requests.delete<void>(`/distances/${raceId}/${distanceId}`),
    attend: (raceId:number, distanceId:number) => requests.post<void>(`/distances/${raceId}/${distanceId}/attend`, {}),
    allAttendees: (raceId:number, distanceId:number) => axios.get<DistanceAttendee[]>( `/distances/${raceId}/${distanceId}/attendees`).then(responseBody)
    // listRaces: () => requests.get<RaceDto[]>(`/races?pageSize=${4}&pageNumber=${1}`)
}

const Profiles = {
    get: (userName:string) => requests.get<Profile>(`/profiles/${userName}`)
}

const agent = {
    Account,
    Races,
    Distances,
    Profiles
}

export default agent;