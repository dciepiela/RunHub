using MediatR;
using RunHub.Contracts.DTOs.Race;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Queries.Races.GetRaceById
{
    public record GetRaceByIdQuery(int RaceId) : IRequest<Result<RaceDto>>;
}