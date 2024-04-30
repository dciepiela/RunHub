using MediatR;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Commands.Profiles.UpdateProfile
{
    public record UpdateProfileCommand(string DisplayName,string FirstName, string LastName, string Club, string Bio, string City, string PostalCode, string Street) :IRequest<Result<Unit>>{}
}
