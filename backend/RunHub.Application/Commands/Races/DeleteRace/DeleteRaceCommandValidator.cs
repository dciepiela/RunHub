using FluentValidation;
using RunHub.Domain.Entity;

namespace RunHub.Application.Commands.Races.DeleteRace
{
    public class DeleteRaceCommandValidator:AbstractValidator<DeleteRaceCommand>
    {
        public DeleteRaceCommandValidator()
        {
            RuleFor(x => x.RaceId)
                .NotEmpty()
                .WithMessage($"{nameof(Race.RaceId)} nie może być puste");
        }
    }
}
