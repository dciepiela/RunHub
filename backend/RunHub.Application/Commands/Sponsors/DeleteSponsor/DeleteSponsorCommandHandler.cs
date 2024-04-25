using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Errors;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Sponsors.DeleteSponsor
{
    public class DeleteSponsorCommandHandler : IRequestHandler<DeleteSponsorCommand, Result<Unit>>
    {
        private readonly DataContext _context;

        public DeleteSponsorCommandHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<Unit>> Handle(DeleteSponsorCommand request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                .Include(x => x.Sponsors)
                .FirstOrDefaultAsync(x => x.RaceId == request.RaceId, cancellationToken);

            if (race == null) return null;

            var sponsor = race.Sponsors
                .FirstOrDefault(x => x.SponsorId == request.SponsorId);

            if (sponsor == null) return null;

            _context.Sponsors.Remove(sponsor);

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Problem z usunięciem sponsora.");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
