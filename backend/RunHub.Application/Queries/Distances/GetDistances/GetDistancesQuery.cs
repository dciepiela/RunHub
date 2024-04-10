using MediatR;
using RunHub.Contracts.DTOs.Distance;
using RunHub.Contracts.Errors;
using RunHub.Contracts.Requests;
using RunHub.Contracts.Responses;
using RunHub.Contracts.Responses.Distances;

namespace RunHub.Application.Queries.Distances.GetDistances
{
    public record GetDistancesQuery(int RaceId) : IRequest<Result<List<DistanceDto>>>;
}
