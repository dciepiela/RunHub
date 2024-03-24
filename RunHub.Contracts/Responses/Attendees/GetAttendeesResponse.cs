using RunHub.Contracts.DTOs;

namespace RunHub.Contracts.Responses.Attendees
{
    public record GetAttendeesResponse(List<AttendeeDto> AttendeesDto);
}
