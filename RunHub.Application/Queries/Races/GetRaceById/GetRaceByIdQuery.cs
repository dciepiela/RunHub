using MediatR;
using RunHub.Contracts.DTOs;
using RunHub.Contracts.Responses;

namespace RunHub.Application.Queries.Races.GetRaceById
{
    public record GetRaceByIdQuery(int RaceId) : IRequest<GetRaceByIdResponse>;
}
