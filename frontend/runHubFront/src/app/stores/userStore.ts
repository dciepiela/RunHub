import { makeAutoObservable, runInAction } from "mobx";
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  User,
  UserFormLogin,
  UserFormRegister,
} from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../routes/Router";
import { toast } from "react-toastify";

export default class UserStore {
  user: User | null = null;
  googleLoading = false;
  refreshTokenTimeout?: NodeJS.Timeout;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormLogin) => {
    const user = await agent.Account.login(creds);
    store.commonStore.setToken(user.token);
    this.startRefreshTokenTimer(user);
    runInAction(() => (this.user = user));
    router.navigate("/");
    toast.success("Zalogowano");
  };

  registerUser = async (
    user: UserFormRegister,
    registrationType: "Organizer" | "Competitor"
  ) => {
    try {
      if (registrationType === "Competitor") {
        await agent.Account.registerCompetitor(user);
        router.navigate(`/account/registerSuccess?email=${user.email}`);
        toast.success("Zarejestrowano, możesz się teraz zalogować");
      } else if (registrationType === "Organizer") {
        await agent.Account.registerOrganizer(user);
        router.navigate(`/account/registerSuccess?email=${user.email}`);
        toast.success("Zarejestrowano, możesz się teraz zalogować");
      }
    } catch (error) {
      console.log(error);
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
    router.navigate("/");
    toast.success("Wylogowano");
  };

  changePassword = async (dto: ChangePasswordDto) => {
    try {
      await agent.Account.changePassword(dto);
      runInAction(() => {
        toast.success("Hasło zostało zmienione pomyślnie");
      });
    } catch (error) {
      runInAction(() => {
        toast.error("Niepoprawne aktualne hasło");
      });
    }
  };

  resetPasswordRequest = async (dto: ForgotPasswordDto) => {
    try {
      const response = await agent.Account.forgotPassword(dto);
      runInAction(() => {
        toast.success(
          "Jeśli istnieje konto z tym adresem e-mail, został wysłany link resetujący."
        );
      });
      return response;
    } catch (error) {
      runInAction(() => {
        toast.error("Nie udało się wysłać linku resetującego.");
      });
      console.error(error);
    }
  };

  resetPassword = async (dto: ResetPasswordDto) => {
    try {
      await agent.Account.resetPassword(dto);
      runInAction(() => {
        toast.success(
          "Hasło zostało pomyślnie zresetowane. Możesz teraz zalogować się przy użyciu nowego hasła."
        );
        router.navigate("/");
      });
      return true;
    } catch (error) {
      runInAction(() => {
        toast.error("Nie udało się zresetować hasła. Proszę spróbuj ponownie.");
        console.error(error);
      });
      return false;
    }
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };

  setImage = (image: string) => {
    if (this.user) {
      this.user.image = image;
    }
  };

  setDisplayName = (name: string) => {
    if (this.user) {
      this.user.displayName = name;
    }
  };

  googleLogin = async (idToken: string) => {
    try {
      this.googleLoading = true;
      const user = await agent.Account.googleLogin(idToken);
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
      runInAction(() => {
        this.user = user;
        this.googleLoading = false;
      });
      if (user.isFirstLogin) {
        router.navigate(`/fillData/${user.userName}`);
      } else {
        router.navigate("/");
      }
    } catch (error) {
      console.log(error);
      runInAction(() => (this.googleLoading = false));
    }
  };

  refreshToken = async () => {
    this.stopRefreshTokenTimer();
    try {
      const user = await agent.Account.refreshToken();
      runInAction(() => (this.user = user));
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
    } catch (error) {
      console.log(error);
    }
  };

  private startRefreshTokenTimer(user: User) {
    const jwtToken = JSON.parse(atob(user.token.split(".")[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
    console.log({ refresTimeout: this.refreshTokenTimeout });
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
