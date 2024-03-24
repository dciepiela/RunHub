using MediatR;

namespace RunHub.Application.Commands.Distances.UpdateDistance
{
    public record UpdateDistanceCommand (int RaceId, int DistanceId, string Name, double LengthInKilometers,
       string Description, int AvailableSlots, int TotalSlots, decimal Price) : IRequest<Unit>;
}
