using MediatR;
using RunHub.Contracts.DTOs.Sponsor;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Commands.Sponsors.CreateSponsor
{
    public record CreateSponsorCommand(int RaceId,CreateSponsorDto SponsorDto) : IRequest<Result<Unit>>;
}
