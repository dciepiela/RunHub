using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Errors;
using RunHub.Contracts.Exceptions;
using RunHub.Domain.Entity;
using RunHub.Domain.Enums;
using RunHub.Persistence;
using System.Linq;

namespace RunHub.Application.Commands.Distances.DeleteDistance
{
    public class DeleteDistanceCommandHandler : IRequestHandler<DeleteDistanceCommand, Result<Unit>>
    {
        private readonly DataContext _context;

        public DeleteDistanceCommandHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<Unit>> Handle(DeleteDistanceCommand request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                .Include(x => x.Distances)
                   .ThenInclude(d => d.DistanceAttendees)
                .FirstOrDefaultAsync(x => x.RaceId == request.RaceId, cancellationToken);

            if (race == null) return null;

            var distance = race.Distances
                .FirstOrDefault(x => x.DistanceId == request.DistanceId);

            if (distance == null) return null;

            if (distance.DistanceAttendees.Any())
            {
                distance.Status = DistanceStatus.Cancelled;
            }
            else
            {
                _context.Distances.Remove(distance);
            }

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Problem z usunięciem dystansu");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
