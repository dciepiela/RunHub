using MediatR;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Commands.Profiles.UpdateProfile
{
    public record UpdateProfileCommand(string DisplayName,string FirstName, string LastName, string Club, string Bio) :IRequest<Result<Unit>>{}
}
