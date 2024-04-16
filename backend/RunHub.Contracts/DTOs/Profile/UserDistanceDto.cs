using System.Text.Json.Serialization;

namespace RunHub.Contracts.DTOs.Profile
{
    public class UserDistanceDto
    {
        public int DistanceId { get; set; }
        public int RaceId { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public string RaceType { get; set; }

        [JsonIgnore]
        public string HostUsername { get; set; }
    }
}
