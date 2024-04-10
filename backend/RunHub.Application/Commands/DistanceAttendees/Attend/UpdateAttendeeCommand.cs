using MediatR;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Commands.DistanceAttendees.Attend
{
    public record UpdateAttendeeCommand(int RaceId, int DistanceId) : IRequest<Result<Unit>>;
}
