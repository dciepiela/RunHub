using FluentValidation;
using RunHub.Domain.Entity;

namespace RunHub.Application.Commands.DistanceAttendees.AttendManually
{
    public class UpdateAttendeeManuallyCommandValidator : AbstractValidator<UpdateAttendeeManullyCommand>
    {
        public UpdateAttendeeManuallyCommandValidator()
        {
            RuleFor(x => x.RegistrationDto.FirstName).NotEmpty().WithMessage($"{nameof(DistanceAttendee.Participator.FirstName)} nie może być puste");
            RuleFor(x => x.RegistrationDto.LastName).NotEmpty().WithMessage($"{nameof(DistanceAttendee.Participator.LastName)} nie może być puste");
        }
    }
}
