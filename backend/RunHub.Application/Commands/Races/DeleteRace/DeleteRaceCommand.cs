using MediatR;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Commands.Races.DeleteRace
{
    public record DeleteRaceCommand(int RaceId) : IRequest<Result<Unit>>;
}
