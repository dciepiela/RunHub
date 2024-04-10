using MediatR;
using RunHub.Contracts.DTOs.DistanceAttendee;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Queries.Attendance
{
    public record GetDistanceAttendeesQuery(int RaceId, int DistanceId):IRequest<Result<List<DistanceAttendeeDto>>>;
}
