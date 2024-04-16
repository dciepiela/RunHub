using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using RunHub.Application.Interfaces;
using Stripe;

namespace RunHub.Infrastructure.Payment
{
    public class StripeService : IStripeService
    {
        private readonly ILogger<StripeService> _logger;

        public StripeService(IConfiguration config, ILogger<StripeService> logger)
        {
            StripeConfiguration.ApiKey = config["Stripe:SecretKey"];
            _logger = logger;
        }

        public async Task<string> CreateCustomerAsync(string token, string email, string firstName, string lastName)
        {
            try
            {
                // First, try to retrieve the customer based on the email
                var existingCustomer = await RetrieveCustomerByEmailAsync(email);

                if (existingCustomer != null)
                {
                    // If the customer already exists, return their ID
                    return existingCustomer.Id;
                }
                else
                {
                    // If the customer doesn't exist, create a new one
                    var options = new CustomerCreateOptions
                    {
                        Email = email,
                        Name = $"{firstName} {lastName}",
                        Source = token
                    };
                    var service = new CustomerService();
                    var customer = await service.CreateAsync(options);
                    return customer.Id;
                }
            }
            catch (StripeException ex)
            {
                _logger.LogError($"Stripe error on creating or retrieving customer: {ex.Message}");
                throw;
            }
        }

        public async Task<bool> ProcessPaymentAsync(string token, decimal amount, string email, string firstName, string lastName, string currency = "pln")
        {
            try
            {
                var customerId = await CreateCustomerAsync(token, email, firstName, lastName);
                var options = new ChargeCreateOptions
                {
                    Amount = (long)(amount * 100),
                    Currency = currency,
                    Customer = customerId,
                    Description = "Payment for registration"
                };

                var service = new ChargeService();
                var charge = await service.CreateAsync(options);
                return charge.Paid;
            }
            catch (StripeException ex)
            {
                _logger.LogError($"Stripe error on processing payment: {ex.Message}");
                return false;
            }
        }

        private async Task<Customer> RetrieveCustomerByEmailAsync(string email)
        {
            var service = new CustomerService();
            var customers = await service.ListAsync(new CustomerListOptions { Email = email });
            return customers.FirstOrDefault();
        }
    }
}
