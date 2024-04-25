using RunHub.Contracts.DTOs.DistanceAttendee;

namespace RunHub.Contracts.DTOs.Distance.Report
{
    public class DistanceIncomeReportDto
    {
        public int DistanceId { get; set; }
        public string Name { get; set; }
        public double LengthInKilometers { get; set; }
        public decimal Price { get; set; }
        public int TotalAttendees { get; set; }
        public decimal TotalIncome { get; set; }
        public List<DistanceAttendeeForReportDto> Attendees { get; set; }
    }
}
