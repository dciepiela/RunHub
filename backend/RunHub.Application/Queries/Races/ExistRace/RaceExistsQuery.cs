using MediatR;

namespace RunHub.Application.Queries.Races.ExistRace
{
    public record RaceExistsQuery(int RaceId):IRequest<bool>;
}
