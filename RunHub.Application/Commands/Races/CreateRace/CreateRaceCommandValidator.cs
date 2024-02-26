using FluentValidation;
using RunHub.Domain.Entity;

namespace RunHub.Application.Commands.Races.CreateRace
{
    public class CreateRaceCommandValidator:AbstractValidator<CreateRaceCommand>
    {
        public CreateRaceCommandValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage($"{nameof(Race.Name)} nie może być puste")
                .MaximumLength(50)
                .WithMessage($"{nameof(Race.Name)} nie może być dłuższe niż 50 znaków");

            RuleFor(x => x.Description)
                .NotEmpty()
                .WithMessage($"{nameof(Race.Description)} nie może być puste")
                .MaximumLength(1000)
                .WithMessage($"{nameof(Race.Description)} nie może być dłuższe niż 1000 znaków");

            RuleFor(x => x.RegistrationEndDate).Must(BeOverThanActualDate);
            RuleFor(x => x.StartDateRace).Must(BeOverThanActualDate);
            RuleFor(x => x.EndDateRace).Must(BeOverThanActualDate);
        }
        public bool BeOverThanActualDate(DateTime dateToCheck)
        {
            DateTime currentDate = DateTime.Now;

            if (dateToCheck > currentDate)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
