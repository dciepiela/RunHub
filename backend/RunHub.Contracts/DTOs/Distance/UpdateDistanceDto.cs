using RunHub.Domain.Enums;

namespace RunHub.Contracts.DTOs.Distance
{
    public class UpdateDistanceDto
    {
        public int DistanceId { get; set; }
        public string Name { get; set; }
        public double LengthInKilometers { get; set; }
        public string Description { get; set; }
        public int AvailableSlots { get; set; }
        public int TotalSlots { get; set; }
        public decimal Price { get; set; }
        public DistanceStatus Status { get; set; } = DistanceStatus.Active;

    }
}
