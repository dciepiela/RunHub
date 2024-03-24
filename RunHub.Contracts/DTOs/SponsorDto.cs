﻿namespace RunHub.Contracts.DTOs
{
    public class SponsorDto
    {
        public int SponsorId { get; set; }
        public string? Name { get; set; }
        public string? Logo { get; set; }
        public string? Description { get; set; }
        public string? WebPageUrl { get; set; }
        public decimal? Amount { get; set; }
        public string? SupportType { get; set; }
        //public int RaceId { get; set; }
    }
        
}
