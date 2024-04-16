using FluentValidation;

namespace RunHub.Application.Commands.Profiles.UpdateProfile
{
    public class UpdateProfileCommandValidator : AbstractValidator<UpdateProfileCommand>
    {
        public UpdateProfileCommandValidator()
        {
            RuleFor(x => x.DisplayName).NotEmpty();
        }
    }
}
