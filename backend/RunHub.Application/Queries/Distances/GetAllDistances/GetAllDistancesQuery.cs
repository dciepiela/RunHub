using MediatR;
using RunHub.Contracts.DTOs.Distance;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Queries.Distances.GetAllDistances
{
    public record GetAllDistancesQuery : IRequest<Result<List<DistanceDto>>>;
}
