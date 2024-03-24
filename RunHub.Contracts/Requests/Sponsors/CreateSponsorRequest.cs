namespace RunHub.Contracts.Requests.Sponsors
{
    public record CreateSponsorRequest(string Name, string Logo, string Description,
        string WebPageUrl, decimal Amount, string SupportType);
}
