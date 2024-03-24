using MediatR;
using RunHub.Contracts.Responses.Races;

namespace RunHub.Application.Queries.Races.GetRaceById
{
    public record GetRaceByIdQuery(int RaceId) : IRequest<GetRaceByIdResponse>;
}
