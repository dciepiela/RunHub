export interface ISponsorDto {
    sponsorId?: number;
    name: string;
    logo?: string;
    description?: string;
    webPageUrl?: string;
    amount?: number;
    supportType?: string; 
  }


  export class SponsorDto implements ISponsorDto {
    sponsorId?: number;
    name: string;
    logo?: string;
    description?: string;
    webPageUrl?: string;
    amount?: number;
    supportType?: string; 

    // representatives?: Profile[];

    constructor(init: ISponsorDto) {
        this.sponsorId = init.sponsorId;
        this.name = init.name;
        this.logo = init.logo;
        this.description = init.description;
        this.webPageUrl = init.webPageUrl;
        this.amount = init.amount;
        this.supportType = init.supportType;
        // this.representatives = init.representatives ?? [];
    }
}