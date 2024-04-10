using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Errors;
using RunHub.Contracts.Exceptions;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Sponsors.CreateSponsor
{
    public class CreateSponsorCommandHandler : IRequestHandler<CreateSponsorCommand, Result<Unit>>
    {
        private readonly DataContext _context;

        public CreateSponsorCommandHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<Unit>> Handle(CreateSponsorCommand request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                .Include(x => x.Sponsors)
                .FirstOrDefaultAsync(x => x.RaceId == request.RaceId,cancellationToken);

            if (race == null) return null;

            var sponsor = request.SponsorDto.Adapt<Sponsor>();

            race.Sponsors.Add(sponsor);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result)
            {
                return Result<Unit>.Failure("Problem z utworzeniem nowego sponsora");
            }

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
