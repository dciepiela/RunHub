using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Errors;
using RunHub.Contracts.Exceptions;
using RunHub.Domain.Entity;
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
                .FirstOrDefaultAsync(x => x.RaceId == request.RaceId, cancellationToken);

            if (race == null) return null;

            var distanceToDelete = race.Distances
                .FirstOrDefault(x => x.DistanceId == request.DistanceId);

            if (distanceToDelete == null) return null;

            _context.Distances.Remove(distanceToDelete);

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Problem z usunięciem dystansu");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
