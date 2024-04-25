namespace RunHub.Contracts.DTOs.Distance.Report
{
    public class DistanceAttendeeForReportDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string Club { get; set; }
        public DateOnly DateOfBirth { get; set; }
    }
}
