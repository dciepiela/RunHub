import { makeAutoObservable, runInAction } from "mobx";
import { DistanceDto } from "../models/distance";
import agent from "../api/agent";

import { DistanceIncomeReportDto } from "../models/distanceIncomeReport";
import { store } from "./store";
import { Profile } from "../models/profile";
import { router } from "../routes/Router";

export default class DistanceStore {
  distanceRegistry = new Map<number, DistanceDto>();
  selectedDistance: DistanceDto | undefined = undefined;
  loadingInitial = false;
  loading = false;

  reports = new Map<number, DistanceIncomeReportDto>();
  loadingReports = new Map<number, boolean>();

  selectedPaymentDistanceId: number | null = null;
  selectedAttendeesDistanceId: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get distances() {
    return Array.from(this.distanceRegistry.values());
  }

  get distancesWithReadyResults() {
    return Array.from(this.distanceRegistry.values())
      .filter((distance) => distance.isReadyToShow)
      .sort(
        (a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime()
      );
  }

  get hostDistances() {
    const user = store.userStore.user;
    if (!user) return [];

    return Array.from(this.distanceRegistry.values()).filter(
      (distance) => distance.hostUsername === user.userName
    );
  }

  setDistance = (distance: DistanceDto) => {
    const user = store.userStore.user;

    if (user) {
      distance.isGoing = distance.distanceAttendees!.some(
        (a) => a.userName === user.userName
      );
    }

    distance.date = new Date(distance.date!);
    this.selectedDistance = distance;
    this.distanceRegistry.set(distance.distanceId!, distance);
  };

  private getDistance = (distanceId: number) => {
    return this.distanceRegistry.get(distanceId);
  };

  setSelectedDistance = async (raceId: number, distanceId: number) => {
    const distance = this.getDistance(distanceId);
    if (distance) {
      this.selectedDistance = distance;
    } else {
      this.loadingInitial = true;
      try {
        const distance = await agent.Distances.details(raceId, distanceId);
        runInAction(() => {
          this.selectedDistance = distance;
          this.setDistance(distance);
          this.loadingInitial = false;
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  loadAllExitsDistances = async () => {
    this.loadingInitial = true;
    try {
      const distances = await agent.Distances.allExistDistances();
      runInAction(() => {
        this.distanceRegistry.clear();
        distances.forEach(this.setDistance);
      });
      this.loadingInitial = false;
    } catch (error) {
      console.error(error);
      runInAction(() => (this.loadingInitial = false));
    }
  };

  loadDistances = async (raceId: number) => {
    this.loadingInitial = true;
    try {
      const distances = await agent.Distances.allDistancesForRace(raceId);
      runInAction(() => {
        this.distanceRegistry.clear();
        distances.forEach((distance) => {
          this.setDistance(distance);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      console.error(error);
      this.loadingInitial = false;
    }
  };

  loadDistance = async (raceId: number, distanceId: number) => {
    let distance = this.getDistance(distanceId);
    if (distance) {
      this.selectedDistance = distance;
      return distance;
    } else {
      this.loadingInitial = true;
      try {
        distance = await agent.Distances.details(raceId, distanceId);
        this.setDistance(distance);
        runInAction(() => {
          this.selectedDistance = distance;
          this.loadingInitial = false;
        });
        return distance;
      } catch (error) {
        this.loadingInitial = false;
        console.error(error);
      }
    }
  };

  createDistance = async (raceId: number, distance: DistanceDto) => {
    this.loading = true;
    try {
      await agent.Distances.create(raceId, distance);
      runInAction(() => {
        const newDistanceDto = new DistanceDto(distance);
        this.setDistance(newDistanceDto);
        this.selectedDistance = newDistanceDto;
        this.loading = false;
      });
    } catch (error: any) {
      console.error(error);
      runInAction(() => (this.loading = false));
      throw error;
    }
  };

  updateDistance = async (
    raceId: number,
    distanceId: number,
    distanceData: Partial<DistanceDto>
  ) => {
    this.loading = true;
    try {
      await agent.Distances.update(raceId, distanceId, distanceData);
      runInAction(() => {
        if (distanceData.distanceId) {
          const updatedDistance = {
            ...this.getDistance(distanceData.distanceId),
            ...distanceData,
          };
          this.distanceRegistry.set(
            distanceId!,
            updatedDistance as DistanceDto
          );
          this.selectedDistance = updatedDistance as DistanceDto;
        }
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  deleteDistance = async (raceId: number, distanceId: number) => {
    this.loading = true;
    try {
      await agent.Distances.delete(raceId, distanceId);
      runInAction(() => {
        this.distanceRegistry.delete(distanceId);
        this.loading = false;
      });
      this.loadDistances(raceId);
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  manualRegister = async (
    raceId: number,
    distanceId: number,
    registrationData: any
  ) => {
    this.loadingInitial = true;
    try {
      await agent.Distances.manualRegistration(
        raceId,
        distanceId,
        registrationData
      );
      runInAction(() => {
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        console.error(error);
        this.loadingInitial = false;
      });
      throw error;
    }
  };

  registerAttendeeWithPayment = async (
    raceId: number,
    distanceId: number,
    stripeToken: string,
    amount: number
  ) => {
    const user = store.userStore.user;
    this.loading = true;
    try {
      if (!distanceId) {
        return;
      }

      const paymentDetails = { stripeToken, amount };

      await agent.Distances.attendWithPayment(
        raceId,
        distanceId,
        paymentDetails
      );

      runInAction(() => {
        if (this.selectedDistance) {
          if (this.selectedDistance.isGoing) {
            this.selectedDistance.distanceAttendees =
              this.selectedDistance.distanceAttendees?.filter(
                (a) => a.userName !== user?.userName
              );
            this.selectedDistance.isGoing = false;
          } else {
            const attendee = new Profile(user!);
            this.selectedDistance.distanceAttendees = [
              ...(this.selectedDistance.distanceAttendees || []),
              attendee,
            ];
            this.selectedDistance.isGoing = true;
          }
          this.distanceRegistry.set(distanceId, this.selectedDistance);
          this.loadDistances(raceId);
        }
      });
      router.navigate("/payment-success", {
        state: {
          message: "Płatność pomyślna, zostałeś zapisany na bieg!",
          raceId: raceId,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  toggleIsReadyToShow = async (distanceId: number, isReadyToShow: boolean) => {
    this.loading = true;
    try {
      await agent.Distances.toggleIsReadyToShow(distanceId, isReadyToShow);
      runInAction(() => {
        const distance = this.distanceRegistry.get(distanceId);
        if (distance) {
          distance.isReadyToShow = !isReadyToShow;
          this.distanceRegistry.set(distance.distanceId!, distance);
        }
        this.loadAllExitsDistances();
        this.loading = false;
      });
    } catch (error) {
      console.error(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  //report
  generateDistanceIncomeReport = async (distanceId: number) => {
    this.setLoadingReport(distanceId, true);
    try {
      const reportData = await agent.Distances.generateDistanceIncomeReport(
        distanceId
      );
      runInAction(() => {
        this.reports.set(distanceId, reportData!);
        this.setLoadingReport(distanceId, false);
      });
    } catch (error) {
      runInAction(() => {
        this.setLoadingReport(distanceId, false);
      });
      console.error(error);
    }
  };

  setLoadingReport = (distanceId: number, isLoading: boolean) => {
    this.loadingReports.set(distanceId, isLoading);
  };

  get isLoadingReport() {
    return (distanceId: number) => this.loadingReports.get(distanceId) ?? false;
  }

  get reportByDistanceId() {
    return (distanceId: number) => this.reports.get(distanceId);
  }

  //attendees and payment form
  setSelectedPaymentDistanceId = (distanceId: number | null) => {
    this.selectedPaymentDistanceId = distanceId;
  };

  setSelectedAttendeesDistanceId = (distanceId: number | null) => {
    this.selectedAttendeesDistanceId = distanceId;
  };

  togglePaymentForm = (distanceId: number) => {
    if (this.selectedPaymentDistanceId === distanceId) {
      this.selectedPaymentDistanceId = null;
    } else {
      this.selectedPaymentDistanceId = distanceId;
    }
  };

  toggleAttendeesList = (distanceId: number) => {
    if (this.selectedAttendeesDistanceId === distanceId) {
      this.selectedAttendeesDistanceId = null;
    } else {
      this.selectedAttendeesDistanceId = distanceId;
    }
  };
}
