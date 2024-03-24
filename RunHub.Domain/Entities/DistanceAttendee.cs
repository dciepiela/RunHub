namespace RunHub.Domain.Entity
{
    public class DistanceAttendee
    {
        //public Guid DistanceAttendeeId { get; set; }
        public string ParticipatorId { get; set; }
        public AppUser Participator { get; set; }

        public int DistanceId { get; set; }
        public Distance Distance { get; set; }

        // Additional properties
        public bool IsPaid { get; set; }
        public DateTime? PaidDate { get; set; }
        public decimal? Price { get; set; }

        // Navigation property
        //public Result Result { get; set; }
    }
}
