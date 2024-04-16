using Microsoft.Extensions.Configuration;
using SendGrid.Helpers.Mail;
using SendGrid;

namespace RunHub.Infrastructure.Email
{
    public class EmailSender
    {
        private readonly IConfiguration _config;

        public EmailSender(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendEmailAsync(string userEmail, string emailSubject, string message)
        {
            var client = new SendGridClient(_config["SendGrid:Key"]);
            var msg = new SendGridMessage
            {
                From = new EmailAddress("s9716dc@ms.wwsi.edu.pl", _config["SendGrid:User"]),
                Subject = emailSubject,
                PlainTextContent = message,
                HtmlContent = message
            };
            msg.AddTo(new EmailAddress(userEmail));
            msg.SetClickTracking(false, false);

            await client.SendEmailAsync(msg);
        }

        public async Task SendPasswordResetEmailAsync(string userEmail, string resetToken)
        {
            var emailSubject = "Reset Your Password";
            // Ensure you use the correct domain and protocol (http or https)
            var resetLink = $"http://localhost:5173/reset-password?token={resetToken}&email={userEmail}";
            var message = $"Please reset your password by clicking on this link: <a href='{resetLink}'>{resetLink}</a>";

            await SendEmailAsync(userEmail, emailSubject, message);
        }
    }
}
