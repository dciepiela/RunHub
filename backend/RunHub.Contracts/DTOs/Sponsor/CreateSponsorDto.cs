namespace RunHub.Contracts.DTOs.Sponsor
{
    public class CreateSponsorDto
    {
        public string Name { get; set; }
        public string Logo { get; set; }
        public string Description { get; set; }
        public string WebPageUrl { get; set; }
        public decimal Amount { get; set; }
        public string SupportType { get; set; }
    }
}
