using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.DTOs;
using RunHub.Contracts.Exceptions;
using RunHub.Contracts.Responses.Sponsors;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Queries.Sponsors.GetSponsors
{
    public class GetSponsorsQueryHandler : IRequestHandler<GetSponsorsQuery, GetSponsorsResponse>
    {
        private readonly DataContext _context;

        public GetSponsorsQueryHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<GetSponsorsResponse> Handle(GetSponsorsQuery request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                            .Include(x => x.Sponsors)
                            .FirstOrDefaultAsync(x => x.RaceId == request.RaceId);

            if (race == null)
            {
                throw new NotFoundException($"{nameof(Race)} z {nameof(Race.RaceId)}: {request.RaceId}" + " nie zostało znalezione w bazie danych");
            }

            var sponsors = race.Sponsors
                .ToList();

            return sponsors.Adapt<GetSponsorsResponse>();
        }
    }
}
