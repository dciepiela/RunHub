using MediatR;
using RunHub.Contracts.DTOs.Race;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Commands.Races.UpdateRace
{
    public record UpdateRaceCommand(UpdateRaceDto RaceDto) : IRequest<Result<Unit>>;
}
