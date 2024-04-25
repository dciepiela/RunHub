using MediatR;
using RunHub.Contracts.DTOs.Distance;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Queries.Distances.GetDistances
{
    public record GetDistancesQuery(int RaceId) : IRequest<Result<List<DistanceDto>>>;
}
