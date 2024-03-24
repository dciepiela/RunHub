using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Exceptions;
using RunHub.Domain.Entity;
using RunHub.Persistence;
using System.Linq;

namespace RunHub.Application.Commands.Distances.DeleteDistance
{
    public class DeleteDistanceCommandHandler : IRequestHandler<DeleteDistanceCommand, Unit>
    {
        private readonly DataContext _context;

        public DeleteDistanceCommandHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(DeleteDistanceCommand request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                .Include(x => x.Distances)
                .FirstOrDefaultAsync(x => x.RaceId == request.RaceId, cancellationToken);

            if (race == null)
            {
                throw new NotFoundException($"Bieg o Id: {request.RaceId} nie został znaleziony w bazie danych");
            }

            var distanceToDelete = race.Distances
                .FirstOrDefault(x => x.DistanceId == request.DistanceId);

            if(distanceToDelete == null)
            {
                throw new NotFoundException($"Bieg o Id: {request.RaceId} z {nameof(Distance.DistanceId)}: {request.DistanceId}" + " nie został znaleziony w bazie danych");
            }

            _context.Distances.Remove(distanceToDelete);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
