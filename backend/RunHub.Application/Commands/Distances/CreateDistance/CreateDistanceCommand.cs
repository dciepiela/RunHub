using MediatR;
using RunHub.Contracts.DTOs.Distance;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Commands.Distances.CreateDistance
{
    public record CreateDistanceCommand(int RaceId, CreateDistanceDto DistanceDto) : IRequest<Result<Unit>>;
}
