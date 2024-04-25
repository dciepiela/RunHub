using MediatR;
using RunHub.Contracts.DTOs.Distance;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Queries.Distances.GetDistanceById
{
    public record GetDistanceByIdQuery(int RaceId, int DistanceId) : IRequest<Result<DistanceDto>>;
}
