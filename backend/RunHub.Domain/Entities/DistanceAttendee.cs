namespace RunHub.Domain.Entity
{
    public class DistanceAttendee
    {
        public string ParticipatorId { get; set; }
        public AppUser Participator { get; set; }

        public int DistanceId { get; set; }
        public Distance Distance { get; set; }
        public bool IsPaid { get; set; }
        public DateTime? PaidDate { get; set; }
        public decimal? Price { get; set; }
    }
}
