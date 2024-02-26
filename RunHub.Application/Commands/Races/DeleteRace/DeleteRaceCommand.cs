using MediatR;

namespace RunHub.Application.Commands.Races.DeleteRace
{
    public record DeleteRaceCommand(int RaceId) : IRequest<Unit>;
}
