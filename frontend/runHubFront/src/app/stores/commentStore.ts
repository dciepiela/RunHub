import { makeAutoObservable, runInAction } from "mobx";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { ChatComment } from "../models/comment";
import { store } from "./store";

export default class CommentStore {
  comments: ChatComment[] = [];
  hubConnection: HubConnection | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  createHubConnection = (raceId: number) => {
    if (store.raceStore.selectedRace) {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl("http://localhost:5000/chat?raceId=" + raceId, {
          accessTokenFactory: () => store.userStore.user?.token as string,
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      this.hubConnection
        .start()
        .catch((error) =>
          console.log("Error estabilishing the HubConnection", error)
        );

      this.hubConnection.on("LoadComments", (comments: ChatComment[]) => {
        runInAction(() => {
          comments.forEach((comment) => {
            comment.createadAt = new Date(comment.createadAt + "Z");
          });
          console.log(comments);
          this.comments = comments;
        });
      });

      this.hubConnection.on("ReceiveComment", (comment: ChatComment) => {
        runInAction(() => {
          comment.createadAt = new Date(comment.createadAt);
          this.comments.unshift(comment);
        });
      });
    }
  };

  stopHubConnection = () => {
    this.hubConnection
      ?.stop()
      .catch((error) => console.log("Error stopping connection: ", error));
  };

  clearComments = () => {
    this.comments = [];
    this.stopHubConnection();
  };

  addComments = async (values: { commentText: string; raceId?: number }) => {
    values.raceId = store.raceStore.selectedRace?.raceId;
    try {
      await this.hubConnection?.invoke("SendComment", values);
    } catch (err) {
      console.log(err);
    }
  };
}
