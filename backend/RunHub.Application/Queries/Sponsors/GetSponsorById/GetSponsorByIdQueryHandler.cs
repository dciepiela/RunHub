using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.DTOs.Sponsor;
using RunHub.Contracts.Errors;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Queries.Sponsors.GetSponsorById
{
    public class GetSponsorByIdQueryHandler : IRequestHandler<GetSponsorByIdQuery, Result<SponsorDto>>
    {
        private readonly DataContext _context;

        public GetSponsorByIdQueryHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<SponsorDto>> Handle(GetSponsorByIdQuery request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                .Include(x => x.Sponsors)
                .FirstOrDefaultAsync(x => x.RaceId == request.RaceId);

            if (race == null) return null;

            var sponsor = race
                .Sponsors
                .FirstOrDefault(x => x.SponsorId == request.SponsorId);

            if (sponsor == null) return null;

            var sponsorResponse = sponsor.Adapt<SponsorDto>();
            return Result<SponsorDto>.Success(sponsorResponse);
        }
    }
}
