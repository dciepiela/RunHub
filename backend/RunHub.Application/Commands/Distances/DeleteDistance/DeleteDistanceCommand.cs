using MediatR;

namespace RunHub.Application.Commands.Distances.DeleteDistance
{
    public record DeleteDistanceCommand(int RaceId, int DistanceId) : IRequest<Unit>;
}
