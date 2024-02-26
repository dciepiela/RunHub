namespace RunHub.Domain.Entity
{
    public class Result
    {
        // Primary Key
        public int ResultId { get; set; }

        // Result details
        public int ResultOpenGroup { get; set; }
        public int ResultAgeGroup { get; set; }
        public int ResultGender { get; set; }
        public TimeSpan Time { get; set; }

        // Foreign Keys
        public int? AgeGroupId { get; set; }
        public AgeGroup AgeGroup { get; set; }

        public int? DistanceAttendeeId { get; set; }
        public DistanceAttendee DistanceAttendee { get; set; }
    }
}
