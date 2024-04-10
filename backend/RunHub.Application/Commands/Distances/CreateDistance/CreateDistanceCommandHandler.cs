using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Errors;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Distances.CreateDistance
{
    public class CreateDistanceCommandHandler : IRequestHandler<CreateDistanceCommand, Result<Unit>>
    {
        private readonly DataContext _context;

        public CreateDistanceCommandHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<Unit>> Handle(CreateDistanceCommand request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                .Include(r => r.Distances)
                .FirstOrDefaultAsync(x => x.RaceId == request.RaceId);

            if (race == null) return null;

            var distance = request.DistanceDto.Adapt<Distance>();

            race.Distances.Add(distance);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result)
            {
                return Result<Unit>.Failure("Problem z utworzeniem nowego dystansu");
            }

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
