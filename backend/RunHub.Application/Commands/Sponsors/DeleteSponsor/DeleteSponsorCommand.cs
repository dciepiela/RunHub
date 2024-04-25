using MediatR;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Commands.Sponsors.DeleteSponsor
{
    public record DeleteSponsorCommand(int RaceId, int SponsorId) : IRequest<Result<Unit>>;

}
