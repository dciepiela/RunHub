import { makeAutoObservable, runInAction } from "mobx";
import { RaceDto, RaceFormValues } from "../models/race";
import agent from "../api/agent";
import { Pagination, PagingParams } from "../models/pagination";
import { store } from "./store";
import { Photo, Profile } from "../models/profile";
import { DistanceDto } from "../models/distance";
import { router } from "../routes/Router";

export default class RaceStore {
    raceRegistry = new Map<number, RaceDto>();
    distanceRegistry = new Map<number, DistanceDto>();
    selectedRace: RaceDto | undefined = undefined;
    selectedDistance: DistanceDto | undefined = undefined;

    loading = false;
    loadingInitial = false;
   
  
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();

    constructor() {
        makeAutoObservable(this);
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

    // get racesByDate(){
    //   return Array.from(this.raceRegistry.values()).sort((a,b) => Date.parse(a.startDateRace!) - Date.parse(b.startDateRace!));
    // }
    
    get racesByDate(){
      return Array.from(this.raceRegistry.values()).sort((a,b) => a.startDateRace!.getTime() - b.startDateRace!.getTime());
    }

    get races(){
      return Array.from(this.raceRegistry.values());
    }

    get hostRaces(){
      const user = store.userStore.user;

      if (!user) return []; // Return empty array if user is not logged in

      // Filter races where the current user is the host
      console.log(user.userName)
      return this.races.filter(race => race.hostUsername == user.userName);
    }
    
    get threeRaces() {
      // Sort races by start date in ascending order
      const sortedRaces = this.racesByDate;
  
      // If there are fewer than 3 races, return all races
      if (sortedRaces.length <= 3) {
          return sortedRaces;
      }
  
      // Return the first three races
      return sortedRaces.slice(0, 3);
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
            this.setPagination(result.pagination);
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

    loadHostingRaces = async() =>{
      this.loadingInitial = true;
      try {
        const hostingRaces = await agent.Races.allHostingRaces();
        runInAction(() =>{
          this.raceRegistry.clear();
          hostingRaces.forEach(race => {
            this.setRace(race);
        });
        this.loadingInitial =false;
        })
      } catch (error) {
        console.log(error);
          runInAction(() => {
            this.loadingInitial = false;
          });
      }
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
                runInAction(() =>{
                    this.raceRegistry.clear();
                    this.setRace(race!); 
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

    private setRace = (race: RaceDto) => {
      const user = store.userStore.user;

      if (!race.raceId) {
        return;
      }

      if(user){
        race.isHost = race.hostUsername === user?.userName;

        race.host = new Profile({
        userName: race.host?.userName,
        displayName: user?.displayName,
        firstName: user?.firstName,
        lastName: user?.lastName,
        gender: user?.gender,
        dateOfBirth: user?.dateOfBirth,
        club: user?.club,
        image: user?.image
      });
      }

      race.registrationEndDate = new Date(race.registrationEndDate!);
      race.startDateRace = new Date(race.startDateRace!);
      race.endDateRace = new Date(race.endDateRace!);
      this.selectedRace = race;
      this.raceRegistry.set(race.raceId, race);
  }

    private getRace = (id:number)=>{
        return this.raceRegistry.get(id);
    }

    createRace = async (race: RaceFormValues) : Promise<number> => {
      const user = store.userStore.user;
      try {
        const newRaceId = await agent.Races.create(race);
        const newRace = new RaceDto(race);
        newRace.hostUsername = user!.userName!;
        this.setRace(newRace);
        runInAction(() => {

          this.selectedRace = newRace;
          router.navigate(`/races/${newRaceId}`)
        });
        return newRaceId;
      } catch (error) {
        console.error('Error creating race:', error);
        throw error;
      }
    };

    uploadPhoto = async (raceId: number, file: Blob) => {
      this.loading = true;
      try {
          const response = await agent.Races.uploadPhoto(raceId, file);
          const photo = response.data as Photo;
          runInAction(() => {
            if (this.selectedRace && this.selectedRace.raceId === raceId) {
              this.selectedRace.photo = photo;
              this.setRace({...this.selectedRace});
          }
              this.loading = false;
          });
      } catch (error) {
          console.error(error);
          runInAction(() => this.loading = false);
      }
  };

  deletePhoto = async (photoId: string) => {
    this.loading = true;
    try {
        await agent.Races.deletePhoto(photoId);
        runInAction(() => {
            if (this.selectedRace && this.selectedRace.photo && this.selectedRace.photo.id === photoId) {
                this.selectedRace.photo = null;
            }
            this.loading = false;
        });
    } catch (error) {
        runInAction(() => {
            this.loading = false;
            console.error(error);
        });
    }
};

getPhoto = async (raceId: number) => {
  let race = this.getRace(raceId);
  if (race && race.photo) {
      return race.photo;
  } else {
      this.loadingInitial = true;
      try {
          race = await agent.Races.details(raceId);
          runInAction(() => {
              if (race) {
                  this.setRace(race);
              }
              this.loadingInitial = false;
          });
          return race?.photo;
      } catch (error) {
          console.error(error);
          runInAction(() => {
              this.loadingInitial = false;
          });
          return null;
      }
  }
};

  setImage = (image: string) => {
    if(this.selectedRace){
        this.selectedRace.photo!.url = image;
    }
}
    updateRace = async (race: RaceFormValues) => {
      try {
        await agent.Races.update(race);
        runInAction(() => {
          if (race.raceId) {
            const existingRace = this.raceRegistry.get(race.raceId);
            if (existingRace) {
              existingRace.distances = race.distances;
    
              Object.assign(existingRace, race);
              this.raceRegistry.set(race.raceId, existingRace);
              this.selectedRace = existingRace;
            }
          }
        });
      } catch (error) {
        console.error(error);
        throw error;
      }
    };


    updateRace2 = async (raceId: number, raceData: any) => {
      try {
          const updatedRace = await agent.Races.updateRace2(raceId, raceData);
          runInAction(() => {
              if (this.raceRegistry.has(raceId)) {
                  const existingRace = this.raceRegistry.get(raceId);
                  this.distanceRegistry.set(raceId, { ...existingRace, ...updatedRace });
              }
          });
      } catch (error) {
          console.error(error);
          throw error;
      }
  };
  
  
    deleteRace = async (id:number) =>{
        try {
            await agent.Races.delete(id);
            runInAction(() => {
                this.raceRegistry.delete(id); 
            })
        } catch (error) {
            console.log(error)
        }
    }

    selectDistance = (distanceId: number) => {
        if (!this.selectedRace) return;
      
        const distance = this.selectedRace.distances?.find(d => d.distanceId === distanceId);
        runInAction(() => {
          this.selectedDistance = distance;
        });
      };

      // updateDistance = async (raceId: number, distanceId: number, distanceData: DistanceDto) => {
      //   this.loading = true;
      //   try {
      //     await agent.Races.updateDistance(raceId, distanceId, distanceData);
      //     runInAction(() => {
      //       // Assuming you want to update the local state upon a successful API call
      //       let race = this.raceRegistry.get(raceId);
      //       if (race) {
      //         const distances = race.distances!.map(d => 
      //           d.distanceId === distanceId ? {...d, ...distanceData} : d
      //         );
      //         race = {...race, distances}; // Update race with new distances array
      //         this.raceRegistry.set(raceId, race); // Update the race in the registry
      //         if (this.selectedRace?.raceId === raceId) {
      //           this.selectedRace = race; // Update selectedRace if it's the one being edited
      //         }
      //       }
      //       this.loading = false;
      //     });
      //   } catch (error) {
      //     console.error('Failed to update distance', error);
      //     runInAction(() => this.loading = false);
      //     throw error; // rethrow if you need further error handling by the caller
      //   }
      // };

      //updateSponsor
    //   updateSponsor = async (raceId: number, sponsorId: number, sponsorData: SponsorDto) => {
    //     this.loading = true;
    //     try {
    //         // Assuming an agent method exists that can update sponsor details
    //         await agent.Races.updateSponsor(raceId, sponsorId, sponsorData);
    //         runInAction(() => {
    //             // Find the race and update the specific sponsor in the race's sponsors array
    //             let race = this.raceRegistry.get(raceId);
    //             if (race) {
    //                 const sponsors = race.sponsors!.map(s => 
    //                     s.sponsorId === sponsorId ? {...s, ...sponsorData} : s
    //                 );
    //                 race = {...race, sponsors}; // Update race with new sponsors array
    //                 this.raceRegistry.set(raceId, race); // Update the race in the registry
    //                 if (this.selectedRace?.raceId === raceId) {
    //                     this.selectedRace = race; // Update selectedRace if it's the one being edited
    //                 }
    //             }
    //             this.loading = false;
    //         });
    //     } catch (error) {
    //         console.error('Failed to update sponsor', error);
    //         runInAction(() => this.loading = false);
    //         throw error; // rethrow if you need further error handling by the caller
    //     }
    // };


// registerAttendeeWithPayment = async (raceId: number, distanceId: number, stripeToken: string, amount: number) => {
//   const user = store.userStore.user;
//   this.loading = true;
//   try {
//       if (!distanceId) {
//           throw new Error("No selected distance available for registration.");
//       }

//       const paymentDetails = { stripeToken, amount };

//       await agent.Distances.attendWithPayment(raceId, distanceId, paymentDetails);
      
//       runInAction(() => {
//           if (this.selectedDistance) {
//               if (this.selectedDistance.isGoing) {
//                   this.selectedDistance.distanceAttendees = this.selectedDistance.distanceAttendees?.filter(a => a.userName !== user?.userName);
//                   this.selectedDistance.isGoing = false;
//               } else {
//                   const attendee = new Profile(user!);
//                   this.selectedDistance.distanceAttendees = [...this.selectedDistance.distanceAttendees || [], attendee];
//                   this.selectedDistance.isGoing = true;
//               }
//               this.distanceRegistry.set(distanceId, this.selectedDistance);
//           }
//       });
      
//       router.navigate('/payment-success', { state: { message: 'Płatność pomyślna, zostałeś zapisany na bieg!' } });
//   } catch (error) {
//       console.error("Error during payment registration:", error);
//   } finally {
//       runInAction(() => this.loading = false);
//   }
// }

updateRaceStatus = async (raceId:number, status:number) => {
  try {
    await agent.Races.changeStatus(raceId, status);
    runInAction(() => {
      const race = this.raceRegistry.get(raceId);
      if (race) {
        race.status! = status;
        this.raceRegistry.set(raceId, race);
      }
    });
  } catch (error) {
    console.error('Failed to update race status:', error);
    throw error;
  }
};
    
}
