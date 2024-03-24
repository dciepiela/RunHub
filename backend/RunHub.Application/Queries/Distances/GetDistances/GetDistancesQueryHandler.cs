using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Exceptions;
using RunHub.Contracts.Responses.Distances;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Queries.Distances.GetDistances
{
    public class GetDistancesQueryHandler : IRequestHandler<GetDistancesQuery, GetDistancesResponse>
    {
        private readonly DataContext _context;

        public GetDistancesQueryHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<GetDistancesResponse> Handle(GetDistancesQuery request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                .Include(x => x.Distances)
                .FirstOrDefaultAsync(x => x.RaceId == request.RaceId);

            if(race == null)
            {
                throw new NotFoundException($"{nameof(Race)} z {nameof(Race.RaceId)}: {request.RaceId}" + " nie zostało znalezione w bazie danych");
            }

            var distances = race.Distances
                .ToList();

            return distances.Adapt<GetDistancesResponse>();
        }
    }
}
