using RunHub.Domain.Entity;

namespace RunHub.Contracts.DTOs.Result
{
    public class ResultDto
    {
        public int ResultId { get; set; }
        public string UserId { get; set; }
        public int DistanceId { get; set; }
        public TimeSpan Time { get; set; }
        public int Place { get; set; }
        public int PlaceGender { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Club {  get; set; }
        public string Gender { get; set; }
    }
}
