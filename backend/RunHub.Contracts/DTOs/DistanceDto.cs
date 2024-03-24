namespace RunHub.Contracts.DTOs
{
    public class DistanceDto
    {
        public int DistanceId { get; set; }
        public string? Name { get; set; }
        public double LengthInKilometers { get; set; }
        public string? Description { get; set; }
        public int AvailableSlots { get; set; }
        public int TotalSlots { get; set; }
        public decimal Price {  get; set; }
        //public int RaceId { get; set; }
    }
      
    //// Relation
    //public ICollection<DistanceAttendee> DistanceAttendees { get; set; }
    //public ICollection<Result> Results { get; set; }
}
