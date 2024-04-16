using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.DTOs.Profile;
using RunHub.Contracts.Errors;
using RunHub.Persistence;

namespace RunHub.Application.Queries.Profiles.ListDistances
{
    public class ListDistancesQueryHandler : IRequestHandler<ListDistancesQuery, Result<List<UserDistanceDto>>>
    {
        private readonly DataContext _context;

        public ListDistancesQueryHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<List<UserDistanceDto>>> Handle(ListDistancesQuery request, CancellationToken cancellationToken)
        {
            var query = _context.DistanceAttendees
                .Include(d => d.Distance)
                    .ThenInclude(d => d.Race)
                        .ThenInclude(r => r.CreatorAppUser)
                .Where(u => u.Participator.UserName == request.UserName)
                .OrderBy(a => a.Distance.Race.StartDateRace)
                .AsQueryable();

            query = request.Predicate switch
            {
                "future" => query.Where(a => a.Distance.Race.StartDateRace >= DateTime.Now),
                "hosting" => query.Where(a => a.Distance.Race.CreatorAppUser.UserName ==
                request.UserName),
                _ => query.Where(a => a.Distance.Race.StartDateRace <= DateTime.Now)
            };

            var distances = await query.ToListAsync(cancellationToken);
            var distanceDtos = distances.Adapt<List<UserDistanceDto>>();

            return Result<List<UserDistanceDto>>.Success(distanceDtos);
        }
    }
}
