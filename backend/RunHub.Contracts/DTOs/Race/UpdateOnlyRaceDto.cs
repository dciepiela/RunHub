using RunHub.Domain.Enum;

namespace RunHub.Contracts.DTOs.Race
{
    public class UpdateOnlyRaceDto
    {
        public int RaceId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime? RegistrationEndDate { get; set; }
        public DateTime? StartDateRace { get; set; }
        public DateTime? EndDateRace { get; set; }
        public RaceStatus RaceStatus { get; set; }
        public RaceType RaceType { get; set; }

        public AddressDto? AddressDto { get; set; }
    }
}
