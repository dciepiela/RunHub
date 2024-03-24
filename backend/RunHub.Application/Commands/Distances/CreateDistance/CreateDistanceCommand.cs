using MediatR;

namespace RunHub.Application.Commands.Distances.CreateDistance
{
    public record CreateDistanceCommand(int RaceId, string Name, double LengthInKilometers, string Description,
        int AvailableSlots, int TotalSlots, decimal Price) : IRequest<int>;
}
