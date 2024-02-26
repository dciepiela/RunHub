using MediatR;
using RunHub.Contracts.Responses;

namespace RunHub.Application.Queries.Races.GetRaces
{
    public class GetRacesQuery : IRequest<GetRacesResponse>
    {
    }
}
