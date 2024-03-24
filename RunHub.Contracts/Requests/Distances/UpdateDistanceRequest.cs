namespace RunHub.Contracts.Requests.Distances
{
    public record UpdateDistanceRequest(string Name, double LengthInKilometers,
        string Description, int AvailableSlots, int TotalSlots, decimal Price);
}
