using RunHub.Contracts.DTOs;

namespace RunHub.Contracts.Responses.Sponsors
{
    public record GetSponsorsResponse(List<SponsorDto> SponsorDtos);
}
