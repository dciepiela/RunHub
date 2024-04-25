using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.DTOs.Distance;
using RunHub.Contracts.Errors;
using RunHub.Persistence;

namespace RunHub.Application.Queries.Distances.GetDistanceById
{
    public class GetDistanceByIdQueryHandler : IRequestHandler<GetDistanceByIdQuery, Result<DistanceDto>>
    {
        private readonly DataContext _context;

        public GetDistanceByIdQueryHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<DistanceDto>> Handle(GetDistanceByIdQuery request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                .Include(x => x.Distances)
                    .ThenInclude(d => d.DistanceAttendees)
                        .ThenInclude(da => da.Participator)
                .FirstOrDefaultAsync(x => x.RaceId == request.RaceId);

            if (race == null) return null;

            var distance = race
                .Distances
                .FirstOrDefault(x => x.DistanceId == request.DistanceId);


            if (distance == null) return null;

            var distanceResponse = distance.Adapt<DistanceDto>();

            return Result<DistanceDto>.Success(distanceResponse);
        }
    }
}
