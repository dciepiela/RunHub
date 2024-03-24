using RunHub.Contracts.DTOs;

namespace RunHub.Contracts.Requests.Distances
{
    public record CreateDistanceRequest(string Name, double LengthInKilometers, 
        string Description, int AvailableSlots, int TotalSlots, decimal Price);
}
