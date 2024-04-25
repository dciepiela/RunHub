using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Errors;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Results.UpdateResult
{
    public class UpdateResultCommandHandler : IRequestHandler<UpdateResultCommand, Result<Unit>>
    {
        private readonly DataContext _context;

        public UpdateResultCommandHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<Unit>> Handle(UpdateResultCommand request, CancellationToken cancellationToken)
        {
            var result = await _context.Results
                .FirstOrDefaultAsync(r => r.ResultId == request.ResultId, cancellationToken);

            if (result == null) return null;
            // Update the time (and possibly other properties if needed)
            result.Time = request.Time;

            // Save changes to reflect the updated time
            await _context.SaveChangesAsync(cancellationToken);

            // Retrieve all results for the same distance
            var resultsForDistance = await _context.Results
                .Where(r => r.DistanceId == result.DistanceId)
                .ToListAsync(cancellationToken);

            // Assign overall places (open result)
            var resultsOrdered = resultsForDistance.OrderBy(r => r.Time).ToList();
            for (int i = 0; i < resultsOrdered.Count; i++)
            {
                resultsOrdered[i].Place = i + 1;  // Open results ranking
            }

            // Re-calculate and assign gender-specific places
            var resultsByGender = resultsForDistance
                .GroupBy(r => r.Gender)
                .ToDictionary(g => g.Key, g => g.OrderBy(r => r.Time).ToList());

            foreach (var genderGroup in resultsByGender)
            {
                var resultsList = genderGroup.Value;
                for (int i = 0; i < resultsList.Count; i++)
                {
                    resultsList[i].PlaceGender = i + 1;
                }
            }

            // Save the updated places
            _context.Results.UpdateRange(resultsForDistance);
            var success = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!success)
            {
                return Result<Unit>.Failure("Problem z aktualizacją wyniku.");
            }

            return Result<Unit>.Success(Unit.Value);
        }

    }
}
