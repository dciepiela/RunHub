using MediatR;
using RunHub.Contracts.DTOs.Profile;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Commands.Profiles.AddInfoAfterRegister
{
    //public record AddInfoAfterRegisterCommand(string club, string gender, DateOnly dateOfBirth, 
    //    string city, string postalCode, string street) :IRequest<Result<Unit>>;

    public record AddInfoAfterRegisterCommand(ProfileAfterRegisterDto ProfileAfterRegisterDto) : IRequest<Result<Unit>>;
}
