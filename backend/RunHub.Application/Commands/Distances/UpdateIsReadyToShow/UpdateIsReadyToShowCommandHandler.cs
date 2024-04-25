using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Errors;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Distances.DisplayDistanceResult
{
    public class UpdateIsReadyToShowCommandHandler : IRequestHandler<UpdateIsReadyToShowCommand, Result<Unit>>
    {
        private readonly DataContext _context;

        public UpdateIsReadyToShowCommandHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<Unit>> Handle(UpdateIsReadyToShowCommand request, CancellationToken cancellationToken)
        {
            var distance = await _context.Distances
               .FirstOrDefaultAsync(x => x.DistanceId == request.DistanceId, cancellationToken);

            if (distance == null) return null;

            // Only update the IsReadyToShow property
            distance.IsReadyToShow = request.IsReadyToShow;

            _context.Distances.Update(distance);
            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result)
                return Result<Unit>.Failure("Problem z aktualizacją widoczności wyników.");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
