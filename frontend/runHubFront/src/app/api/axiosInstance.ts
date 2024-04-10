// import axios, { AxiosError, AxiosResponse } from "axios";
// import { API_BASE_URL } from "../../config";
// import { PaginatedResult } from "../models/pagination";
// import { toast } from "react-toastify";
// import { router } from "../routes/Router";
// import { store } from "../stores/store";


// const axiosInstance = axios.create({
//     baseURL: `${API_BASE_URL}`
// });


// const sleep = (delay: number) => {
//     return new Promise((resolve) => {
//         setTimeout(resolve, delay);
//     })
// }

// let isInterceptorSetup = false;

// export const setupRequestInterceptor = () =>{
//     axiosInstance.interceptors.request.use(config => {
//         const token = store.commonStore.token;
//         if(token && config.headers) config.headers.Authorization = `Bearer ${token}`;
//         return config;
//     })}


// export const setupResponseInterceptor = () =>{
//     if(!isInterceptorSetup){
//         axiosInstance.interceptors.response.use(
//             async (response: AxiosResponse) => {
//                 await sleep(500);
//                 // console.log(response);

//                 const pagination = response.headers["pagination"];

//                 if(pagination){
//                     response.data = new PaginatedResult(response.data, JSON.parse(pagination))
//                     return response as AxiosResponse<PaginatedResult<unknown>>
//                 }
//                 return response;
//             }, (error : AxiosError) => {
//                 const {data, status, config} = error.response as AxiosResponse;
//                 switch(status) {
//                     case 400:
//                         if(config.method === 'get' && Object.prototype.hasOwnProperty.call(data.errors, 'id')){
//                             router.navigate('/not-found')
//                         }
//                         if(data.errors){
//                             const modalStateErrors = [];
//                             for(const key in data.errors){
//                                 if(data.errors[key]){
//                                     modalStateErrors.push(data.errors[key])
//                                 }
//                             }
//                             throw modalStateErrors.flat();
//                         } else{
//                             toast.error(data);
//                         }
//                         break;
//                     case 401:
//                         toast.error('Brak autoryzacji')
//                         break;
//                     case 403:
//                         toast.error('Zakazane')
//                         break;
//                     case 404:
//                         router.navigate('/not-found')
//                         break;
//                     case 500:
//                         store.commonStore.setServerError(data);
//                         router.navigate('/server-error');
//                         break;    
//                 }
//                 return Promise.reject(error);
//         }
//         )
//         isInterceptorSetup = true;
//     }
// }

// setupRequestInterceptor();
// setupResponseInterceptor();

// export default axiosInstance;