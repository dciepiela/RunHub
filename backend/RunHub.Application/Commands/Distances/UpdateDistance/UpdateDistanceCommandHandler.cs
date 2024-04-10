using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Errors;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Distances.UpdateDistance
{
    public class UpdateDistanceCommandHandler : IRequestHandler<UpdateDistanceCommand, Result<Unit>>
    {
        private readonly DataContext _context;

        public UpdateDistanceCommandHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<Unit>> Handle(UpdateDistanceCommand request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                .Include(x => x.Distances)
                .FirstOrDefaultAsync(x => x.RaceId == request.RaceId, cancellationToken);

            if (race == null) return null;

            var distance = race.Distances.FirstOrDefault(x => x.DistanceId == request.DistanceDto.DistanceId);

            if (distance == null) return null;

            distance = request.DistanceDto.Adapt(distance);

            _context.Distances.Update(distance);

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Problem z aktualizacją dystansu");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
