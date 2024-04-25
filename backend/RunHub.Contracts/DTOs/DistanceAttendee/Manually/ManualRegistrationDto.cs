namespace RunHub.Contracts.DTOs.DistanceAttendee.Manually
{
    public class ManualRegistrationDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Club {  get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Gender { get; set; }
    }
}
