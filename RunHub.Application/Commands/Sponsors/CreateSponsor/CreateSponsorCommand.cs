using MediatR;
using RunHub.Contracts.Requests.Sponsors;

namespace RunHub.Application.Commands.Sponsors.CreateSponsor
{
    public record CreateSponsorCommand(int RaceId, string Name, string Logo, string Description,
        string WebPageUrl, decimal Amount, string SupportType) : IRequest<int>;
}
