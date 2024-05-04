import { makeAutoObservable, runInAction } from "mobx";
import { Photo, Profile, UserDistance } from "../models/profile";
import agent from "../api/agent";
import { store } from "./store";
import { DEFAULT_PHOTO_URL } from "../../config";
import { router } from "../routes/Router";
import { toast } from "react-toastify";

export default class ProfileStore {
  profile: Profile | null = null;
  loadingProfile = false;
  uploading = false;
  loading = false;
  userDistances: UserDistance[] = [];
  loadingDistances = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isCurrentUser() {
    if (store.userStore.user && this.profile) {
      return store.userStore.user.userName === this.profile.userName;
    }
    return false;
  }

  loadProfile = async (userName: string) => {
    this.loadingProfile = true;
    try {
      const profle = await agent.Profiles.get(userName);
      runInAction(() => {
        this.profile = profle;
        this.loadingProfile = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingProfile = false));
    }
  };

  uploadPhoto = async (file: Blob) => {
    this.uploading = true;
    try {
      const response = await agent.Profiles.uploadPhoto(file);
      const photo = response.data;
      runInAction(() => {
        if (this.profile) {
          this.profile.photo = photo;
          if (store.userStore.user) {
            store.userStore.setImage(photo.url);
            this.profile.image = photo.url;
          }
        }
        this.uploading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.uploading = false));
    }
  };

  deletePhoto = async (photo: Photo) => {
    this.loading = true;
    try {
      await agent.Profiles.deletePhoto(photo.id);
      runInAction(() => {
        if (
          this.profile &&
          this.profile.photo &&
          this.profile.photo.id === photo.id
        ) {
          this.profile.photo = null;
          this.profile.image = undefined;
          store.userStore.setImage(DEFAULT_PHOTO_URL);
        }
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      console.log(error);
    }
  };

  updateProfile = async (profile: Partial<Profile>) => {
    this.loading = true;
    try {
      await agent.Profiles.updateProfile(profile);
      runInAction(() => {
        if (
          profile.displayName &&
          profile.displayName !== store.userStore.user?.displayName
        ) {
          store.userStore.setDisplayName(profile.displayName);
        }
        this.profile = { ...this.profile, ...(profile as Profile) };
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  updateProfileAfterGoogleLogin = async (profile: Partial<Profile>) => {
    this.loading = true;
    try {
      await agent.Profiles.updateProfileAfterGoogleLogin(profile);
      runInAction(() => {
        this.profile = {
          ...this.profile,
          ...(profile as Profile),
        };
        this.loading = false;
        router.navigate("/");
        toast.success("Pomyślnie dodano informacje osobiste");
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  loadUserDistances = async (userName: string, predicate?: string) => {
    this.loadingDistances = true;
    try {
      const distances = await agent.Profiles.listDistances(
        userName,
        predicate!
      );
      runInAction(() => {
        this.userDistances = distances;
        this.loadingDistances = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingDistances = false;
      });
    }
  };
}
