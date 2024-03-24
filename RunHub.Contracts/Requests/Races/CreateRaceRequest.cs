using RunHub.Contracts.DTOs;
using RunHub.Domain.Enum;

namespace RunHub.Contracts.Requests.Races
{
    public record CreateRaceRequest(
        string Name,
        string Description,
        DateTime RegistrationEndDate,
        DateTime StartDateRace,
        DateTime EndDateRace,
        string Image,
        RaceStatus RaceStatus,
        RaceType RaceType,
        AddressDto AddressDto);
}
