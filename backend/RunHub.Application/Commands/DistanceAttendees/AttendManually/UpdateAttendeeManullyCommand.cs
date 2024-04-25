using MediatR;
using RunHub.Contracts.DTOs.DistanceAttendee.Manually;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Commands.DistanceAttendees.AttendManually
{
    public record UpdateAttendeeManullyCommand(int RaceId, int DistanceId, ManualRegistrationDto RegistrationDto) : IRequest<Result<Unit>> { }
}
