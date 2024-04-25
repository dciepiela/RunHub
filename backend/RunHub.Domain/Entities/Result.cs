namespace RunHub.Domain.Entity
{
    public class Result
    {
        public int ResultId { get; set; }
        public string UserId { get; set; }
        public int DistanceId { get; set; }
        public TimeSpan Time { get; set; }
        public int Place { get; set; }
        public int PlaceGender {  get; set; }
        public string Gender { get; set; }
        public AppUser User { get; set; }
        public Distance Distance { get; set; }
        //// Primary Key
        //public int ResultId { get; set; }
        //public TimeSpan Time { get; set; }
        //public int DistanceAttendeeId { get; set; }  // FK to DistanceAttendee
        //public DistanceAttendee DistanceAttendee { get; set; }

        //// Result details
        //public int ResultOpenGroup { get; set; }
        //public int ResultAgeGroup { get; set; }
        //public int ResultGender { get; set; }


        //// Foreign Keys
        //public int? AgeGroupId { get; set; }
        //public AgeGroup AgeGroup { get; set; }
        //public int? DistanceAttendeeId { get; set; }
        //public DistanceAttendee DistanceAttendee { get; set; }
    }
}
