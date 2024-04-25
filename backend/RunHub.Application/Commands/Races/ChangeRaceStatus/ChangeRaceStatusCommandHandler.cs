using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Errors;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Races.ChangeRaceStatus
{
    public class ChangeRaceStatusCommandHandler : IRequestHandler<ChangeRaceStatusCommand, Result<Unit>>
    {
        private readonly DataContext _context;

        public ChangeRaceStatusCommandHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<Unit>> Handle(ChangeRaceStatusCommand request, CancellationToken cancellationToken)
        {
            var race = await _context.Races.FirstOrDefaultAsync(r => r.RaceId == request.RaceId);

            if (race == null) return null;

            race.RaceStatus = request.RaceStatus;

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result)
                return Result<Unit>.Failure("Nie można zaaktualizować statusu");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
