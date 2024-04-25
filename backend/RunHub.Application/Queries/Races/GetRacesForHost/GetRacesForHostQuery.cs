using MediatR;
using RunHub.Contracts.DTOs.Race;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Queries.Races.GetRacesForHost
{
    public class GetRacesForHostQuery() : IRequest<Result<List<RaceDto>>>;
}
