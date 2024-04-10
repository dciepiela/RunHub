import { makeAutoObservable, reaction, runInAction } from "mobx";
import { RaceDto, RaceFormValues } from "../models/race";
import agent from "../api/agent";
import { Pagination, PaginationRequestParams, PagingParams } from "../models/pagination";
import { store } from "./store";
import { Profile } from "../models/profile";
import { DistanceDto } from "../models/distance";

export default class RaceStore {
    raceRegistry = new Map<number, RaceDto>();
    distanceRegistry = new Map<number, DistanceDto>();
    // races: RaceDto[] = [];
    selectedRace: RaceDto | undefined = undefined;
    selectedDistance: DistanceDto | undefined = undefined;

    loading = false;
    loadingInitial = false;
   
  
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();

    constructor() {
        makeAutoObservable(this);
        reaction(
          () => this.selectedRace?.distances.map(d => d.distanceId),
          (distanceIds) => {
              if (distanceIds) {
                  console.log("Distances updated: ", distanceIds);
                  // Perform any additional actions here
                  // For example, you could re-fetch the race details to ensure the UI is in sync with the backend
              }
          }
      );
    }

    setPagingParams = (pagingParams: PagingParams) => {
      this.pagingParams = pagingParams;
    }

    get axiosParams() {
      const params = new URLSearchParams();
      params.append('PageNumber', this.pagingParams.pageNumber.toString());
      params.append('PageSize', this.pagingParams.pageSize.toString());
      return params;
    }

    get racesByDate(){
      return Array.from(this.raceRegistry.values()).sort((a,b) => Date.parse(a.startDateRace!) - Date.parse(b.startDateRace!));
    }


    loadRaces = async () => {
        this.loadingInitial = true;
        try {
          const result = await agent.Races.allRaces(this.axiosParams);
          runInAction(() => {
            this.raceRegistry.clear();
            
            result.data.forEach(race => {
                this.setRace(race);
            });
            // this.raceRegistry = races.data;
            this.setPagination(result.pagination);
            // this.pagination = races.paginationParams;
            this.loadingInitial = false;
          });
        } catch (error) {
            console.log(error);
          runInAction(() => {
            this.loadingInitial = false;
          });
        }
    }

    setPagination = (pagination: Pagination) =>{
      this.pagination = pagination;
    }

    loadRace = async (id:number)=>{
        let race = this.getRace(id);
        if(race){
            this.selectedRace = race;
            return race;
        }else{
            this.loadingInitial = true;
            try {
                race = await agent.Races.details(id);
                this.setRace(race!);
                runInAction(() =>{
                    this.selectedRace = race;
                    this.loadingInitial = false;
                })
                return race;
            } catch (error) {
                console.log(error);
                runInAction(() =>{
                    this.loadingInitial = false
                })
            }
        }
    }

    // private setRace = (race:RaceDto) =>{
    //     const user = store.userStore.user;
    //     if(user){
    //         race.distances?.forEach(distance => {
    //             distance.isGoing = distance.distanceAttendees?.some(
    //                 a => a.userName === user.userName
    //             ) ?? false;
    //         })

    //         const hostProfile = new Profile({
    //             userName: race.hostUsername
    //         })
    //         race.isHost = race.hostUsername === user.userName;
    //         race.host = hostProfile

    //         // console.log(race.isHost)
    //         // race.host = race.hostUsername;
    //     }
    //     // race.startDateRace = new Date(race.startDateRace!);

    //     this.raceRegistry.set(race.raceId!, race)
    // }

    private setRace = (race: RaceDto) => {
      const user = store.userStore.user;
      
      // Check if the race has an ID before trying to set it in the registry
      if (race.raceId !== undefined) {
          if (user) {
              // Assuming distances and attendees are optional, check if they exist before trying to access them
              race.distances?.forEach(distance => {
                  distance.isGoing = distance.distanceAttendees?.some(a => a.userName === user.userName) ?? false;
              });
  
              // Create a host profile and determine if the current user is the host
              const hostProfile = new Profile({
                  userName: race.hostUsername,
                  // Include other necessary properties for the Profile
              });
              race.isHost = race.hostUsername === user.userName;
              race.host = hostProfile;
          }
  
          // Add the race to the registry
          this.raceRegistry.set(race.raceId, race);
      } else {
          // Handle the case where raceId is undefined (e.g., log an error or throw an exception)
          console.error('Attempting to set a race without an ID:', race);
      }
  }

    private getRace = (id:number)=>{
        return this.raceRegistry.get(id);
    }
    


    createRace = async (race: RaceFormValues): Promise<number> => {
      try {
        // Send the race data to the backend and expect a new race ID in response
        const newRaceId = await agent.Races.create(race);
        runInAction(() => {
          // Create a full RaceDto object including the new race ID
          const newRaceDto: RaceDto = {
            ...race,
            raceId: newRaceId
            // Add additional properties or adjustments as necessary
          };
          this.setRace(newRaceDto);
          this.selectedRace = newRaceDto;
        });
        return newRaceId; // Return the new race ID for navigation
      } catch (error) {
        console.error('Error creating race:', error);
        throw error; // Rethrow the error to be handled in handleFormSubmit
      }
    };
    
    updateRace = async (race: RaceFormValues) => {
      try {
        await agent.Races.update(race);
        runInAction(() => {
          if (race.raceId) {
            // Find the existing race and update it
            let existingRace = this.raceRegistry.get(race.raceId);
            if (existingRace) {
              // Update distances - you might need a more complex logic here
              // if distances have IDs
              existingRace.distances = race.distances;
    
              // Update the rest of the race details
              Object.assign(existingRace, race);
              this.raceRegistry.set(race.raceId, existingRace);
              this.selectedRace = existingRace;
            }
          }
        });
      } catch (error) {
        console.error('Error updating race:', error);
        throw error;
      }
    };

    deleteRace = async (id:string) =>{
        try {
            await agent.Races.delete(id);
            runInAction(() => {
                this.raceRegistry.delete(id); 
            })
        } catch (error) {
            console.log(error)
        }
    }

    //distance
    selectDistance = (distanceId: number) => {
        if (!this.selectedRace) return;
      
        const distance = this.selectedRace.distances?.find(d => d.distanceId === distanceId);
        runInAction(() => {
          this.selectedDistance = distance;
        });
      };

      // Update attendance method
      updateAttendance = async (distanceId: number) => {
        const user = store.userStore.user;
        // if (!user) return;
        this.loading = true;
        try {
          // Toggling attendance on the server
          await agent.Distances.attend(this.selectedRace!.raceId!, distanceId);
          runInAction(() => {
            // Using selectDistance to set the selected distance in the store
            this.selectDistance(distanceId);
            
            // Ensure selectedDistance is now set and matches the distanceId
            if (this.selectedDistance?.isGoing && this.selectedDistance.distanceId === distanceId) {
              // Toggle isGoing and update the distanceAttendees list accordingly
              const isGoing = this.selectedDistance.isGoing;
              if (isGoing) {
                // User is currently attending, remove them from the list
                this.selectedDistance.distanceAttendees = this.selectedDistance.distanceAttendees?.filter(a => a.userName !== user?.userName);
              } else {
                // User is not currently attending, add them to the list
                const attendeeProfile = new Profile(user!);
                this.selectedDistance?.distanceAttendees?.push(attendeeProfile);
                this.selectedDistance.isGoing = true;
              }
              // Toggle the isGoing state
            //   this.raceRegistry.set(this.selectedRace!.raceId!, this.selectedRace!);
              this.distanceRegistry.set(this.selectedDistance!.distanceId, this.selectedDistance!)

      
              // Trigger the observer by updating the raceRegistry
              if (this.selectedRace) {
                this.raceRegistry.set(this.selectedRace.raceId!, {...this.selectedRace});
              }
            }
            this.loading = false;
          });

        } catch (error) {
          runInAction(() => {
            this.loading = false;
          });
          console.error("Failed to update attendance", error);
        }
      };


      // updateAttendance2 = async (distanceId: number) => {
      //   const user = store.userStore.user;
      //   this.loading = true;
      //   try {
      //       await agent.Distances.attend(this.selectedRace!.raceId, distanceId);
      //       runInAction(() => {
      //           if(this.selectedDistance?.isGoing){
      //               this.selectedDistance.distanceAttendees = 
      //                   this.selectedDistance.distanceAttendees?.filter(a => a.userName != user?.userName);
      //               this.selectedDistance.isGoing = false;
      //           }else{
      //               const attendee = new Profile(user!);
      //               this.selectedDistance?.distanceAttendees?.push(attendee);
      //               this.selectedDistance!.isGoing = true;
      //           }
      //           this.distanceRegistry.set(this.selectedDistance!.distanceId, this.selectedDistance!);
      //       })
      //   } catch (error) {
      //       console.log(error);
      //   }finally{
      //       runInAction(() => this.loading = false);
      //   }
      // };



      //update distance:
      updateDistance = async (raceId: number, distanceId: number, distanceData: DistanceDto) => {
        this.loading = true;
        try {
          await agent.Races.updateDistance(raceId, distanceId, distanceData);
          runInAction(() => {
            // Assuming you want to update the local state upon a successful API call
            let race = this.raceRegistry.get(raceId);
            if (race) {
              const distances = race.distances.map(d => 
                d.distanceId === distanceId ? {...d, ...distanceData} : d
              );
              race = {...race, distances}; // Update race with new distances array
              this.raceRegistry.set(raceId, race); // Update the race in the registry
              if (this.selectedRace?.raceId === raceId) {
                this.selectedRace = race; // Update selectedRace if it's the one being edited
              }
            }
            this.loading = false;
          });
        } catch (error) {
          console.error('Failed to update distance', error);
          runInAction(() => this.loading = false);
          throw error; // rethrow if you need further error handling by the caller
        }
      };
}
