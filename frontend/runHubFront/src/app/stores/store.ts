import { createContext, useContext } from "react";
import RaceStore from "./raceStore";
import DistanceStore from "./distanceStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ProfileStore from "./profileStore";
import ResultStore from "./resultStore";
import SponsorStore from "./sponsorStore";
import CommentStore from "./commentStore";

interface Store {
  commonStore: CommonStore;
  raceStore: RaceStore;
  distanceStore: DistanceStore;
  userStore: UserStore;
  profileStore: ProfileStore;
  resultStore: ResultStore;
  sponsorStore: SponsorStore;
  commentStore: CommentStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  raceStore: new RaceStore(),
  distanceStore: new DistanceStore(),
  userStore: new UserStore(),
  profileStore: new ProfileStore(),
  resultStore: new ResultStore(),
  sponsorStore: new SponsorStore(),
  commentStore: new CommentStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
