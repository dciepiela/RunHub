using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Application.Interfaces;
using RunHub.Contracts.Exceptions;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Commands.DistanceAttendees.Attend
{
    public class UpdateAttendeeCommandHandler : IRequestHandler<UpdateAttendeeCommand, Unit>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public UpdateAttendeeCommandHandler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }
        public async Task<Unit> Handle(UpdateAttendeeCommand request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                .Include(r => r.Distances)
                    .ThenInclude(d => d.DistanceAttendees)
                        .ThenInclude(da => da.Participator)
                .FirstOrDefaultAsync(x => x.RaceId == request.RaceId, cancellationToken);

            if (race == null)
            {
                throw new NotFoundException($"{nameof(Race)} z {nameof(Race.RaceId)}: {request.RaceId}" + " nie został znaleziony w bazie danych");
            }

            var distance = race.Distances
                .AsEnumerable()
                .FirstOrDefault(x => x.DistanceId == request.DistanceId);


            if (distance == null)
            {
                throw new NotFoundException($"{nameof(Distance)} z {nameof(Distance.DistanceId)}: {request.DistanceId}" + " nie zostało znalezione w bazie danych");
            }

            if(distance.AvailableSlots <= 0)
            {
                throw new Exception("No available slots for this distance");
            }

            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

            if (user == null)
            {
                throw new NotFoundException($"Użytkownik o identyfikatorze nie został znaleziony w bazie danych");
            }

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

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
