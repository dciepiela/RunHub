import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { ISponsorDto, SponsorDto } from "../models/sponsor";

export default class SponsorStore {
    sponsorRegistry = new Map<number, SponsorDto>();
    selectedSponsor: SponsorDto | undefined = undefined;
    loadingInitial = false;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get sponsors(): ISponsorDto[] {
        return Array.from(this.sponsorRegistry.values());
    }

    private setSponsor = (sponsor: SponsorDto) => {
        this.sponsorRegistry.set(sponsor.sponsorId!, sponsor)
    }

    private getSponsor = (sponsorId:number)=>{
        return this.sponsorRegistry.get(sponsorId);
    }

    loadSponsors = async (raceId:number) => {
        this.loadingInitial = true;
        try {
            const sponsors = await agent.Sponsors.listForRace(raceId);
            runInAction(() => {
                this.sponsorRegistry.clear(); // Clear existing data
                sponsors.forEach(sponsor => {
                    this.setSponsor(sponsor)
                });
                this.loadingInitial = false;
            });
        } catch (error) {
            console.error(error);
            this.loadingInitial = false;
        }
    };

    loadSponsor = async (raceId: number, sponsorId: number) => {
        let sponsor = this.sponsorRegistry.get(sponsorId);
        if (sponsor) {
            this.selectedSponsor = sponsor;
            return sponsor;
        } else {
            this.loadingInitial=true;
            try {
                sponsor = await agent.Sponsors.details(raceId, sponsorId);
                this.setSponsor(sponsor)
                runInAction(() => {
                    this.selectedSponsor = sponsor;
                    this.loadingInitial = false;
                });
                return sponsor;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
    };

    updateSponsor = async (raceId: number, sponsorId: number, sponsorData: SponsorDto) => {
        try {
            await agent.Sponsors.update(raceId, sponsorId, sponsorData);
            runInAction(() => {
                if (sponsorData.sponsorId) {
                    const updatedSponsor = {...this.getSponsor(sponsorData.sponsorId), ...sponsorData}
                    this.sponsorRegistry.set(sponsorData.sponsorId, updatedSponsor as SponsorDto)
                    this.sponsorRegistry.set(sponsorId!, updatedSponsor as SponsorDto)
                    this.selectedSponsor = updatedSponsor as SponsorDto;
                }
            });
        } catch (error) {
            console.error( error);
        }
    };

    createSponsor = async (raceId: number, sponsor: SponsorDto) => {
        this.loading = true;
        try {
            await agent.Sponsors.create(raceId, sponsor);
            runInAction(() => {
                const newSponsorDto = new SponsorDto(sponsor);
                this.setSponsor(newSponsorDto);
                this.selectedSponsor = newSponsorDto;
                this.loading = false;
            });
        } catch (error:any) {
            console.error('Error creating sponsor:', error);
            runInAction(() => this.loading = false);
            throw error;
        }
    };

    deleteSponsor = async(raceId:number, sponsorId:number) => {
        this.loading = true;
        try {
            await agent.Sponsors.delete(raceId, sponsorId);
            runInAction(() => {
                this.sponsorRegistry.delete(sponsorId);
                this.loading = false;
            })
            this.loadSponsors(raceId);
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
        }
    }  
}
