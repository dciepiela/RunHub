using MediatR;
using RunHub.Contracts.Responses.Sponsors;

namespace RunHub.Application.Queries.Sponsors.GetSponsors
{
    public record GetSponsorsQuery(int RaceId):IRequest<GetSponsorsResponse>;
}
