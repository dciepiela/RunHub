using MediatR;
using RunHub.Contracts.DTOs.Profile;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Queries.Profiles.ListDistances
{
    public record ListDistancesQuery(string UserName, string Predicate) : IRequest<Result<List<UserDistanceDto>>> { }
}
