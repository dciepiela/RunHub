using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.DTOs.Race;
using RunHub.Contracts.Errors;
using RunHub.Persistence;

namespace RunHub.Application.Queries.Races.GetRaceById
{
    public class GetRaceByIdQueryHandler : IRequestHandler<GetRaceByIdQuery, Result<RaceDto>>
    {
        private readonly DataContext _context;

        public GetRaceByIdQueryHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<RaceDto>> Handle(GetRaceByIdQuery request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                .Include(x => x.Address)
                .Include(x => x.Photo)
                .Include(x => x.CreatorAppUser)
                .Include(x => x.Distances)
                    .ThenInclude(d =>d.DistanceAttendees)
                        .ThenInclude(da => da.Participator)
                            .ThenInclude(p => p.Photo)
                .Include(x => x.Sponsors)
                .FirstOrDefaultAsync(x => x.RaceId == request.RaceId, cancellationToken);

            if (race == null) return null;

            var raceResponse = race.Adapt<RaceDto>();

            return Result<RaceDto>.Success(raceResponse);
        }
    }
}
