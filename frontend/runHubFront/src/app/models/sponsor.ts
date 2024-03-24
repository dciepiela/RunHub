export interface SponsorDto {
    sponsorId: number;
    name: string;
    logo: string;
    description: string;
    webPageUrl: string;
    amount: number;
    supportType: string | null; // Adjust the type as per your requirements
  }