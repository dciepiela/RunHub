using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.DTOs.DistanceAttendee;
using RunHub.Contracts.Errors;
using RunHub.Persistence;

namespace RunHub.Application.Queries.Attendance
{
    public class GetDistanceAttendeesQueryHandler : IRequestHandler<GetDistanceAttendeesQuery, Result<List<DistanceAttendeeDto>>>
    {
        private readonly DataContext _context;

        public GetDistanceAttendeesQueryHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<List<DistanceAttendeeDto>>> Handle(GetDistanceAttendeesQuery request, CancellationToken cancellationToken)
        {
            // Sprawdzenie, czy wyścig istnieje
            var raceExists = await _context.Races.AnyAsync(r => r.RaceId == request.RaceId);

            if (!raceExists)
            {
                return null;
            }


            // Pobranie uczestników dla określonego dystansu
            var attendees = await _context.DistanceAttendees
                 .Where(da => da.DistanceId == request.DistanceId)
                 .Include(da => da.Participator)
                 .OrderBy(x=>x.RaceBib)
                 .ToListAsync();

            var result = attendees.Adapt<List<DistanceAttendeeDto>>();



            return Result<List<DistanceAttendeeDto>>.Success(result);
        }
    }
}
