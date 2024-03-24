using MediatR;
using RunHub.Contracts.Responses.Distances;

namespace RunHub.Application.Queries.Distances.GetDistanceById
{
    public record GetDistanceByIdQuery(int RaceId, int DistanceId) : IRequest<GetDistanceByIdResponse>;
}
