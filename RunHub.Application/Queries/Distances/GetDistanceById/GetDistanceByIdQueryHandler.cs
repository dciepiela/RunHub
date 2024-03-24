using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Exceptions;
using RunHub.Contracts.Responses.Distances;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Queries.Distances.GetDistanceById
{
    public class GetDistanceByIdQueryHandler : IRequestHandler<GetDistanceByIdQuery, GetDistanceByIdResponse>
    {
        private readonly DataContext _context;

        public GetDistanceByIdQueryHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<GetDistanceByIdResponse> Handle(GetDistanceByIdQuery request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                .Include(x => x.Distances)
                .FirstOrDefaultAsync(x => x.RaceId == request.RaceId);

            if(race == null)
            {
                throw new NotFoundException($"{nameof(Race)} z {nameof(Race.RaceId)}: {request.RaceId}" + " nie zostało znalezione w bazie danych");
            }

            var distance = race
                .Distances
                .FirstOrDefault(x => x.DistanceId == request.DistanceId);
               

            if(distance == null)
            {
                throw new NotFoundException($"{nameof(Distance)} z {nameof(Distance.DistanceId)}: {request.DistanceId}" + " nie zostało znalezione w bazie danych");
            }

            return distance.Adapt<GetDistanceByIdResponse>();
        }
    }
}
