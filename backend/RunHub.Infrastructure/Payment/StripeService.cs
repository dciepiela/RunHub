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

        public async Task<string> CreateOrUpdateCustomerAsync(string stripeToken, string email, string firstName, string lastName)
        {
            try
            {
                var options = new CustomerCreateOptions
                {
                    Email = email,
                    Name = $"{firstName} {lastName}",
                    Source = stripeToken // This might be updated based on Stripe API changes to use PaymentMethod
                };

                var service = new CustomerService();
                Customer customer = await service.CreateAsync(options);
                return customer?.Id;
            }
            catch (StripeException ex)
            {
                _logger.LogError(ex, "Error creating/updating Stripe customer");
                throw;
            }
        }

        public async Task<bool> ChargeCustomerAsync(string customerId, decimal amount, string description)
        {
            try
            {
                var options = new ChargeCreateOptions
                {
                    Amount = (long)(amount * 100), // convert amount to cents
                    Currency = "usd",
                    Description = description,
                    Customer = customerId
                };

                var service = new ChargeService();
                Charge charge = await service.CreateAsync(options);
                return charge.Paid;
            }
            catch (StripeException ex)
            {
                _logger.LogError(ex, "Error charging Stripe customer");
                throw;
            }
        }
    }
}
