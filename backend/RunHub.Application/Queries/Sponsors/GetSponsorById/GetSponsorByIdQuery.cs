using MediatR;
using RunHub.Contracts.DTOs.Sponsor;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Queries.Sponsors.GetSponsorById
{
    public record GetSponsorByIdQuery(int RaceId, int SponsorId) : IRequest<Result<SponsorDto>>;
}
