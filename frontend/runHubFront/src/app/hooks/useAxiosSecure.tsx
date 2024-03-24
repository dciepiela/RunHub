/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { handleError } from "../helper/ErrorHandler";
import { User, UserFormRegister, UserProfileToken } from "../models/user";

export const loginAPI = async (user: User) => {
  try {
    const data = await axios.post<UserProfileToken>(
      "http://localhost:5000/api/account/login",
      user
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerCompetitorAPI = async (user: UserFormRegister) => {
  try {
    const data = await axios.post<UserProfileToken>(
      "http://localhost:5000/api/account/registerCompetitor",
      user
    );
    return data;
  } catch (error) {
    handleError(error);
    // return Promise.reject(error);
  }
};

export const registerOrganizerAPI = async (user: UserFormRegister) => {
  try {
    const data = await axios.post<UserProfileToken>(
      "http://localhost:5000/api/account/registerOrganizer",
      user
    );
    return data;
  } catch (error) {
    handleError(error);
    // return Promise.reject(error);
  }
};
