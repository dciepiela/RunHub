using MediatR;
using RunHub.Contracts.DTOs.Sponsor;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Commands.Sponsors.UpdateSponsor
{
    public record UpdateSponsorCommand(int RaceId, UpdateSponsorDto SponsorDto):IRequest<Result<Unit>>;
}
