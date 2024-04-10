import { createContext, useContext } from "react";
import RaceStore from "./raceStore"
import DistanceStore from "./distanceStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ProfileStore from "./profileStore";

interface Store {
    commonStore: CommonStore;
    raceStore: RaceStore,
    distanceStore: DistanceStore,
    userStore: UserStore,
    profileStore: ProfileStore
}

export const store: Store = {
    commonStore: new CommonStore(),
    raceStore: new RaceStore(),
    distanceStore: new DistanceStore(),
    userStore: new UserStore(),
    profileStore: new ProfileStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}