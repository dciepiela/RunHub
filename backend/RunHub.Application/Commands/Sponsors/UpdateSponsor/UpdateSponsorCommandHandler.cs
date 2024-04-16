using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Errors;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Sponsors.UpdateSponsor
{
    public class UpdateSponsorCommandHandler : IRequestHandler<UpdateSponsorCommand, Result<Unit>>
    {
        private readonly DataContext _context;

        public UpdateSponsorCommandHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<Unit>> Handle(UpdateSponsorCommand request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
               .Include(x => x.Sponsors)
               .FirstOrDefaultAsync(x => x.RaceId == request.RaceId, cancellationToken);

            if (race == null) return null;

            var sponsor = race.Sponsors.FirstOrDefault(x => x.SponsorId == request.SponsorDto.SponsorId);

            if (sponsor == null) return null;

            sponsor  = request.SponsorDto.Adapt(sponsor);

            _context.Sponsors.Update(sponsor);

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Problem z aktualizacją sponsora");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
