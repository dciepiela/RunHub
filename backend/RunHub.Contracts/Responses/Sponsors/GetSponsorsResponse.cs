using RunHub.Contracts.DTOs.Sponsor;

namespace RunHub.Contracts.Responses.Sponsors
{
    public record GetSponsorsResponse(List<SponsorDto> SponsorDtos);
}
