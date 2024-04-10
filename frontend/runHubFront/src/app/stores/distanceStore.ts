import {makeAutoObservable, runInAction} from "mobx";
import { DistanceDto } from "../models/distance";
import { store } from "./store";
import agent from "../api/agent";
import { Profile } from "../models/profile";
import { RaceDto } from "../models/race";
import { DistanceAttendee } from "../models/distanceAttendee";

export default class DistanceStore{
    distanceRegistry = new Map<number, DistanceDto>();
    selectedDistance: DistanceDto | undefined = undefined;
    race:RaceDto | undefined;
    loading = false;



    constructor() {
        makeAutoObservable(this)
    }


    updateAttendance = async (raceId: number, distanceId: number) => {
      const user = store.userStore.user;
      // if (!user || !this.selectedDistance) return; // Ensure user is logged in and a distance is selected
      
      this.loading = true;
      try {
          // Toggle user's attendance for the selected distance
          const isAttending = this.selectedDistance.distanceAttendees?.some(
              (attendee) => attendee.userName === user.userName
          );
    
          // If user is already attending, remove from attendees list; otherwise, add
          if (isAttending) {
              this.selectedDistance.distanceAttendees = this.selectedDistance.distanceAttendees?.filter(
                  (attendee) => attendee.userName !== user.userName
              );
          } else {
              const attendee = new Profile(user);
              this.selectedDistance.distanceAttendees?.push(attendee);
          }
    
          // Update attendance on the server
          await agent.Distances.attend(raceId, distanceId);
          
          // Update the distance in the registry
          this.distanceRegistry.set(
              distanceId, // Use distanceId provided as argument
              this.selectedDistance
          );
    
          this.loading = false;
      } catch (error) {
          console.error("Error updating attendance:", error);
          this.loading = false;
      }
    };
  
      
}