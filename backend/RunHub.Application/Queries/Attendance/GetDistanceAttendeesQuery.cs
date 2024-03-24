using MediatR;
using RunHub.Contracts.Responses.Attendees;

namespace RunHub.Application.Queries.Attendance
{
    public record GetDistanceAttendeesQuery(int RaceId, int DistanceId):IRequest<GetAttendeesResponse>;
}
