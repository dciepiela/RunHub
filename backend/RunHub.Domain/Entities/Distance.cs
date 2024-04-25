using RunHub.Domain.Enums;

namespace RunHub.Domain.Entity
{
    public class Distance
    {
        public int DistanceId { get; set; }

        // Distance details
        public string Name { get; set; }
        public double LengthInKilometers { get; set; }
        public string Description { get; set; }

        // Slot details
        public int AvailableSlots { get; set; }
        public int TotalSlots { get; set; }
        
        // Price of distance
        public decimal Price { get; set; }

        // Foreign Key
        public int RaceId { get; set; }
        public Race Race { get; set; }
        public DistanceStatus Status { get; set; } = DistanceStatus.Active;
        public bool IsReadyToShow { get; set; } = false;


        // Relation
        public ICollection<DistanceAttendee> DistanceAttendees { get; set; } = new List<DistanceAttendee>();
        public ICollection<Result> Results { get; set; } = new List<Result>();

    }


}
