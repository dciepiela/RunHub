using RunHub.Contracts.DTOs.Distance;
using RunHub.Contracts.DTOs.Sponsor;
using RunHub.Domain.Enum;

namespace RunHub.Contracts.DTOs.Race
{
    public class UpdateRaceDto
    {
        public int RaceId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public DateTime RegistrationEndDate { get; set; }
        public DateTime StartDateRace { get; set; }
        public DateTime EndDateRace { get; set; }
        public string? Image { get; set; }
        public RaceStatus RaceStatus { get; set; }
        public RaceType RaceType { get; set; }
        public AddressDto? AddressDto { get; set; }
        public ICollection<CreateDistanceDto>? Distances { get; set; }
        public ICollection<SponsorDto>? Sponsors { get; set; }
    }
}
