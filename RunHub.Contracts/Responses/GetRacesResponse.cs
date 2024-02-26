using RunHub.Contracts.DTOs;

namespace RunHub.Contracts.Responses
{
    public record GetRacesResponse(List<RaceDto> RaceDtos);
}
