import { makeAutoObservable, runInAction } from "mobx";
import { ChangePasswordDto, ForgotPasswordDto, ResetPasswordDto, User, UserFormLogin, UserFormRegister } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../routes/Router";
import { toast } from "react-toastify";

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
            // console.log('Próba zalogowania się przy użyciu poświadczeń:', creds);
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            router.navigate("/");
            toast.success("Zalogowano");
            console.log(user);
    }

    registerUser = async (
        user: UserFormRegister,
        registrationType: "Organizer" | "Competitor"
      ) => {
        try {
            if (registrationType === "Competitor") {
                await agent.Account.registerCompetitor(user);
                router.navigate("/");
                toast.success("Zarejestrowano");
            } else if (registrationType === "Organizer") {
                await agent.Account.registerOrganizer(user);
                router.navigate("/");
                toast.success("Zarejestrowano");

            }    
        } catch (error) {
            console.log(error)
            throw error;
        }
      };
    
    logout = () =>{
        store.commonStore.setToken(null);
        this.user = null;
        router.navigate('/');
        toast.success("Wylogowano");
    }


    changePassword = async (dto: ChangePasswordDto) => {
        try {
            await agent.Account.changePassword(dto);
            runInAction(() => {
                toast.success('Hasło zostało zmienione pomyślnie');
            });
        } catch (error) {
            runInAction(() => {
                toast.error('Niepoprawne aktualne hasło');
            });
        }
    }

    resetPasswordRequest = async (dto: ForgotPasswordDto) => {
        try {
            const response = await agent.Account.forgotPassword(dto);
            runInAction(() => {
                toast.success('Jeśli istnieje konto z tym adresem e-mail, został wysłany link resetujący.');
            });
            return response;  // You might want to return something specific here or handle navigation
        } catch (error) {
            runInAction(() => {
                // Generally, you might want to handle errors more specifically based on the error response
                toast.error('Nie udało się wysłać linku resetującego.');
            });
            console.error('Błąd podczas żądania resetowania hasła:', error);
        }
    }

    resetPassword = async (dto: ResetPasswordDto) => {
        try {
            await agent.Account.resetPassword(dto);
            runInAction(() => {
                toast.success('Hasło zostało pomyślnie zresetowane. Możesz teraz zalogować się przy użyciu nowego hasła.');
                router.navigate('/');
            });
            return true; // Indicate success
        } catch (error) {
            runInAction(() => {
                toast.error('Nie udało się zresetować hasła. Proszę spróbuj ponownie.');
                console.error('Reset hasła błąd:', error);
            });
            return false;
        }
    }


    getUser = async() =>{
        try {
            const user = await agent.Account.current();
            runInAction(()=> this.user = user)
        } catch (error) {
            console.log(error);
        }
    }

    setImage = (image: string) => {
        if(this.user){
            this.user.image = image;
        }
    }

    setDisplayName = (name: string) => {
        if(this.user){
            this.user.displayName = name;
        }
    }
}