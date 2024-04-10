using MediatR;
using RunHub.Contracts.DTOs.Sponsor;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Queries.Sponsors.GetSponsors
{
    public record GetSponsorsQuery(int RaceId):IRequest<Result<List<SponsorDto>>>;
}
