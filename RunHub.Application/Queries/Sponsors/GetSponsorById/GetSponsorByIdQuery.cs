using MediatR;
using RunHub.Contracts.Responses.Sponsors;

namespace RunHub.Application.Queries.Sponsors.GetSponsorById
{
    public record GetSponsorByIdQuery(int RaceId, int SponsorId) : IRequest<GetSponsorByIdResponse>;
}
