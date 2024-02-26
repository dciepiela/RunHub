using MediatR;
using RunHub.Domain.Entity;
using RunHub.Domain.Enum;

namespace RunHub.Application.Commands.Races.CreateRace
{
    public record CreateRaceCommand(
        string Name,
        string Description,
        DateTime RegistrationEndDate,
        DateTime StartDateRace,
        DateTime EndDateRace,
        string Image,
        RaceStatus RaceStatus,
        RaceType RaceType,
        string CreatorAppUserId,
        Address Address) : IRequest<int>;
}
