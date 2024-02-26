using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Exceptions;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Races.DeleteRace
{
    public class DeleteRaceCommandHandler : IRequestHandler<DeleteRaceCommand, Unit>
    {
        private readonly DataContext _context;

        public DeleteRaceCommandHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteRaceCommand request, CancellationToken cancellationToken)
        {

            var raceToDelete = await _context.Races
                .FirstOrDefaultAsync(x => x.RaceId == request.RaceId, cancellationToken);

            if(raceToDelete == null)
            {
                throw new NotFoundException($"{nameof(Race)} z {nameof(Race.RaceId)}: {request.RaceId}" + " nie zostało znalezione w bazie danych");
            }

            _context.Races.Remove(raceToDelete);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
