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
    }
}
