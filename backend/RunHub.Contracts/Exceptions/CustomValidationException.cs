using RunHub.Contracts.Errors;

namespace RunHub.Contracts.Exceptions
{
    public class CustomValidationException:Exception
    {
        public CustomValidationException(List<AppException> validationErrors)
        {
            ValidationErrors = validationErrors;
        }

        public List<AppException> ValidationErrors { get; set; }
    }
}
