using RunHub.Domain.Enums;

namespace RunHub.Domain.Entity
{
    public class Distance
    {
        public int DistanceId { get; set; }
        public string Name { get; set; }
        public double LengthInKilometers { get; set; }
        public string Description { get; set; }
        public int AvailableSlots { get; set; }
        public int TotalSlots { get; set; }
        public decimal Price { get; set; }
        public DistanceStatus Status { get; set; } = DistanceStatus.Active;
        public bool IsReadyToShow { get; set; } = false;

        public int RaceId { get; set; }
        public Race Race { get; set; }
        public ICollection<DistanceAttendee> DistanceAttendees { get; set; } = new List<DistanceAttendee>();
        public ICollection<Result> Results { get; set; } = new List<Result>();
    }
}
