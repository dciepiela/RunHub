import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormLogin } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../routes/Router";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    //logged in

    get isLoggedIn(){
        return !!this.user;
    }

    login = async(creds:UserFormLogin) => {
            console.log('Attempting login with credentials:', creds);
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            router.navigate("/");
            console.log(user);
    }

    logout = () =>{
        store.commonStore.setToken(null);
        this.user = null;
        router.navigate('/');
    }

    getUser = async() =>{
        try {
            const user = await agent.Account.current();
            runInAction(()=> this.user = user)

            // store.commonStore.setToken(user.token);
        } catch (error) {
            console.log(error);
        }
    }

}