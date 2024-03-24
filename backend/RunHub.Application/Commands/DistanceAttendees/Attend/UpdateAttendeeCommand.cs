using MediatR;

namespace RunHub.Application.Commands.DistanceAttendees.Attend
{
    public record UpdateAttendeeCommand(int RaceId, int DistanceId) : IRequest<Unit>;
}
