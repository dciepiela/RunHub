namespace RunHub.Contracts.DTOs.Payments
{
    public class StripeRequestDto
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "PLN";
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
