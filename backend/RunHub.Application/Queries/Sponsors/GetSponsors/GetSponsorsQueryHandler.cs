using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.DTOs.Sponsor;
using RunHub.Contracts.Errors;
using RunHub.Persistence;

namespace RunHub.Application.Queries.Sponsors.GetSponsors
{
    public class GetSponsorsQueryHandler : IRequestHandler<GetSponsorsQuery, Result<List<SponsorDto>>>
    {
        private readonly DataContext _context;

        public GetSponsorsQueryHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<List<SponsorDto>>> Handle(GetSponsorsQuery request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                            .Include(x => x.Sponsors)
                            .FirstOrDefaultAsync(x => x.RaceId == request.RaceId);

            if (race == null) return null;

            var sponsors = race.Sponsors
                .ToList();

            var result = sponsors.Adapt<List<SponsorDto>>();

            return Result<List<SponsorDto>>.Success(result);
        }
    }
}
