using RunHub.Contracts.DTOs.DistanceAttendee;
using RunHub.Contracts.DTOs.Result;
using RunHub.Domain.Enums;

namespace RunHub.Contracts.DTOs.Distance
{
    public class DistanceDto
    {
        public int DistanceId { get; set; }
        public string Name { get; set; }
        public double LengthInKilometers { get; set; }
        public string Description { get; set; }
        public int AvailableSlots { get; set; }
        public int TotalSlots { get; set; }
        public decimal Price { get; set; }
        public string HostUsername { get; set; }
        public int RegisteredUser {  get; set; }
        public DistanceStatus Status { get; set; } = DistanceStatus.Active;
        public bool IsReadyToShow { get; set; }
        public DateTime Date { get; set; }

        public ICollection<DistanceAttendeeDto> DistanceAttendees { get; set; }
        public ICollection<ResultDto> Results { get; set; }
    }

    //// Relation
    //public ICollection<DistanceAttendee> DistanceAttendees { get; set; }
    //public ICollection<Result> Results { get; set; }
}
