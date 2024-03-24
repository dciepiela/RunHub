using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.DTOs;
using RunHub.Contracts.Responses.Attendees;
using RunHub.Persistence;

namespace RunHub.Application.Queries.Attendance
{
    public class GetDistanceAttendeesQueryHandler : IRequestHandler<GetDistanceAttendeesQuery, GetAttendeesResponse>
    {
        private readonly DataContext _context;

        public GetDistanceAttendeesQueryHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<GetAttendeesResponse> Handle(GetDistanceAttendeesQuery request, CancellationToken cancellationToken)
        {
            // Sprawdzenie, czy wyścig istnieje
            var raceExists = await _context.Races.AnyAsync(r => r.RaceId == request.RaceId);
            if (!raceExists)
            {
                // Możemy zwrócić odpowiednią odpowiedź, np. NotFound lub BadRequest
                return new GetAttendeesResponse(null); // Zwracać pustą odpowiedź lub użyć np. null
            }

            // Pobranie uczestników dla określonego dystansu
            var attendees = await _context.DistanceAttendees
                .Where(da => da.DistanceId == request.DistanceId)
                .Include(da => da.Participator) // Łączenie z użytkownikiem
                .Select(da => new AttendeeDto
                {
                    UserName = da.Participator.UserName,
                    DisplayName = da.Participator.DisplayName,
                    // Można dodać inne właściwości według potrzeb
                })
                .ToListAsync(cancellationToken);

            return new GetAttendeesResponse(attendees);
        }
    }
}
