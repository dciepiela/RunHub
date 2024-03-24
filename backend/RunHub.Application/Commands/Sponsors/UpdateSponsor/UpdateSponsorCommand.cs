using MediatR;

namespace RunHub.Application.Commands.Sponsors.UpdateSponsor
{
    public record UpdateSponsorCommand():IRequest<Unit>;
}
