using RunHub.Contracts.DTOs;

namespace RunHub.Contracts.Responses.Distances
{
    public record GetDistancesResponse (List<DistanceDto> DistanceDtos);
}
