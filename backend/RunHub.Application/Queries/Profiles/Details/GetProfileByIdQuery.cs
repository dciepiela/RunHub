using MediatR;
using RunHub.Contracts.DTOs.DistanceAttendee;
using RunHub.Contracts.DTOs.Profile;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Queries.Profiles.Details
{
    public record GetProfileByIdQuery(string UserName) : IRequest<Result<Profile>> { }
}
