using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Errors;
using RunHub.Contracts.Exceptions;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Races.DeleteRace
{
    public class DeleteRaceCommandHandler : IRequestHandler<DeleteRaceCommand, Result<Unit>>
    {
        private readonly DataContext _context;

        public DeleteRaceCommandHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<Unit>> Handle(DeleteRaceCommand request, CancellationToken cancellationToken)
        {

            var raceToDelete = await _context.Races
                .FirstOrDefaultAsync(x => x.RaceId == request.RaceId, cancellationToken);

            if (raceToDelete == null) return null;

            if (raceToDelete.Photo != null)
            {
                _context.Remove(raceToDelete.Photo);
            }

            _context.Remove(raceToDelete);

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Problem z usunięciem biegu");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
