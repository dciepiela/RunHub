using MediatR;
using RunHub.Contracts.DTOs.Distance;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Commands.Distances.UpdateDistance
{
    public record UpdateDistanceCommand (int RaceId, UpdateDistanceDto DistanceDto) : IRequest<Result<Unit>>;
}
