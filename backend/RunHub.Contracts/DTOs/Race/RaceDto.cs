﻿using RunHub.Contracts.DTOs.Distance;
using RunHub.Contracts.DTOs.Sponsor;
using RunHub.Domain.Entities;
using RunHub.Domain.Entity;
using RunHub.Domain.Enum;

namespace RunHub.Contracts.DTOs.Race
{
    public class RaceDto
    {
        public int RaceId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastUpdateDate { get; set; }
        public DateTime RegistrationEndDate { get; set; }
        public DateTime StartDateRace { get; set; }
        public DateTime EndDateRace { get; set; }
        public RaceStatus RaceStatus { get; set; }
        public RaceType RaceType { get; set; }
        public string HostUsername { get; set; }
        public AddressDto AddressDto { get; set; }
        public Photo Photo { get; set; }
        public ICollection<DistanceDto>? Distances { get; set; }
        public ICollection<SponsorDto>? Sponsors { get; set; }
    };
}
