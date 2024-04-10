using MediatR;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Commands.Distances.DeleteDistance
{
    public record DeleteDistanceCommand(int RaceId, int DistanceId) : IRequest<Result<Unit>>;
}
