using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Application.Interfaces;
using RunHub.Contracts.Errors;
using RunHub.Contracts.Exceptions;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Commands.DistanceAttendees.Attend
{
    public class UpdateAttendeeCommandHandler : IRequestHandler<UpdateAttendeeCommand, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public UpdateAttendeeCommandHandler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }
        public async Task<Result<Unit>> Handle(UpdateAttendeeCommand request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                .Include(r => r.Distances)
                    .ThenInclude(d => d.DistanceAttendees)
                        .ThenInclude(da => da.Participator)
                .FirstOrDefaultAsync(x => x.RaceId == request.RaceId, cancellationToken);

            if (race == null) return null;

            var distance = race.Distances
                .AsEnumerable()
                .FirstOrDefault(x => x.DistanceId == request.DistanceId);


            if (distance == null) return null;

            if(distance.AvailableSlots <= 0)
            {
                return Result<Unit>.Failure("Brak dostępnych miejsc");
            }

            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

            if (user == null) return null;

            var distanceAttendee = distance.DistanceAttendees
                .FirstOrDefault(da => da.Participator.UserName == user.UserName);

            if(distanceAttendee != null)
            {
                distance.DistanceAttendees.Remove(distanceAttendee);
                distance.AvailableSlots++;
            }

            if (distanceAttendee == null)
            {
                distanceAttendee = new DistanceAttendee
                {
                    Participator = user,
                    Distance = distance,
                    IsPaid = true,
                    Price = distance.Price,
                    PaidDate = DateTime.UtcNow
                };

                distance.DistanceAttendees.Add(distanceAttendee);
                distance.AvailableSlots--;
            }

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Nie można dołączyć");
        }
    }
}
