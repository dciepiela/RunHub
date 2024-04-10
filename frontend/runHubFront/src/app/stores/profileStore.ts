import { makeAutoObservable, runInAction } from "mobx";
import { Profile } from "../models/profile";
import agent from "../api/agent";

export default class ProfileStore {
    profile: Profile | null = null;
    loadingProfile = false;

    constructor(){
        makeAutoObservable(this);
    }

    loadProfile = async (userName:string) => {
        this.loadingProfile = true;
        try {
            const profle = await agent.Profiles.get(userName);
            runInAction(() => {
                this.profile = profle;
                this.loadingProfile = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingProfile = false);
        }
    }
}