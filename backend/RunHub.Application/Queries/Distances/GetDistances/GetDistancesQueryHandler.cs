using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.DTOs.Distance;
using RunHub.Contracts.Errors;
using RunHub.Persistence;

namespace RunHub.Application.Queries.Distances.GetDistances
{
    public class GetDistancesQueryHandler : IRequestHandler<GetDistancesQuery, Result<List<DistanceDto>>>
    {
        private readonly DataContext _context;

        public GetDistancesQueryHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<List<DistanceDto>>> Handle(GetDistancesQuery request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                .Include(x => x.Distances)
                .FirstOrDefaultAsync(x => x.RaceId == request.RaceId);

            if (race == null) return null;

            var distances = await _context.Distances
                .Include(d => d.DistanceAttendees)
                    .ThenInclude(da => da.Participator)
                .Where(d => d.RaceId == request.RaceId)
                .ToListAsync(cancellationToken);


            var result = distances.Adapt<List<DistanceDto>>();

            return Result<List<DistanceDto>>.Success(result);
        }
    }
}
