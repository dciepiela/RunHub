using RunHub.Domain.Entity;
using RunHub.Domain.Enum;

namespace RunHub.Contracts.Requests
{
    public record UpdateRaceRequest(
        string Name,
        string Description,
        DateTime RegistrationEndDate,
        DateTime StartDateRace,
        DateTime EndDateRace,
        string Image,
        RaceStatus RaceStatus,
        RaceType RaceType,
        Address Address);
}
