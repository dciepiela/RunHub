namespace RunHub.Domain.Entity
{
    public class Distance
    {
        public int DistanceId { get; set; }

        // Distance details
        public string Name { get; set; } // e.g., "5k", "10k", "Half Marathon", "Marathon"
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

        // Relation
        public ICollection<DistanceAttendee> DistanceAttendees { get; set; }
        //public ICollection<Result> Results { get; set; }

    }
}
