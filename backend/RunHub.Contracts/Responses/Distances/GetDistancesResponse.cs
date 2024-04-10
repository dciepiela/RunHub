using RunHub.Contracts.DTOs.Distance;

namespace RunHub.Contracts.Responses.Distances
{
    public record GetDistancesResponse (List<DistanceDto> DistanceDtos);
}
