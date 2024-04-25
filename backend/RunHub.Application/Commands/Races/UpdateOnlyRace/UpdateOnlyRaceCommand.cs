using MediatR;
using RunHub.Contracts.DTOs.Race;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Commands.Races.UpdateOnlyRace
{
    public record UpdateOnlyRaceCommand(UpdateOnlyRaceDto RaceDto):IRequest<Result<Unit>>;
}
