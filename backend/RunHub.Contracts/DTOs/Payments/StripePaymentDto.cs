﻿namespace RunHub.Contracts.DTOs.Payments
{
    public class StripePaymentDto
    {
        public string StripeToken { get; set; }  // Token generated by Stripe on the client-side
        public decimal Amount { get; set; }      // Amount to be charged

        //public string Email { get; set; }
        //public string FirstName { get; set; }
        //public string LastName { get; set; }
        //public decimal Amount { get; set; }
        //public string Currency { get; set; } = "pln";
    }
}
