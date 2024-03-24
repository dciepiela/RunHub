using MediatR;
using RunHub.Contracts.Responses.Distances;

namespace RunHub.Application.Queries.Distances.GetDistances
{
    public record GetDistancesQuery(int RaceId): IRequest<GetDistancesResponse>;
}
