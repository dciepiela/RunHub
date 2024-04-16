namespace RunHub.Application.Interfaces
{
    public interface IStripeService
    {
        Task<string> CreateCustomerAsync(string token, string email, string firstName, string lastName);
        Task<bool> ProcessPaymentAsync(string token, decimal amount, string email, string firstName, string lastName, string currency = "pln");
    }
}
