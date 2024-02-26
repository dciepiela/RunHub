using FluentValidation;
using RunHub.Domain.Entity;

namespace RunHub.Application.Queries.Races.GetRaceById
{
    public class GetRaceByIdQueryValidator : AbstractValidator<GetRaceByIdQuery>
    {
        public GetRaceByIdQueryValidator()
        {
            RuleFor(x => x.RaceId)
                .NotEmpty()
                .WithMessage($"{nameof(Race.RaceId)} nie może być puste");

        }
    }
}
