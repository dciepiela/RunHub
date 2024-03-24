using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Exceptions;
using RunHub.Contracts.Responses.Distances;
using RunHub.Contracts.Responses.Sponsors;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Queries.Sponsors.GetSponsorById
{
    public class GetSponsorByIdQueryHandler : IRequestHandler<GetSponsorByIdQuery, GetSponsorByIdResponse>
    {
        private readonly DataContext _context;

        public GetSponsorByIdQueryHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<GetSponsorByIdResponse> Handle(GetSponsorByIdQuery request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                .Include(x => x.Sponsors)
                .FirstOrDefaultAsync(x => x.RaceId == request.RaceId);

            if (race == null)
            {
                throw new NotFoundException($"{nameof(Race)} z {nameof(Race.RaceId)}: {request.RaceId}" + " nie zostało znalezione w bazie danych");
            }

            var sponsor = race
                .Sponsors
                .FirstOrDefault(x => x.SponsorId == request.SponsorId);


            if (sponsor == null)
            {
                throw new NotFoundException($"{nameof(Sponsor)} z {nameof(Sponsor.SponsorId)}: {request.SponsorId}" + " nie zostało znalezione w bazie danych");
            }

            return sponsor.Adapt<GetSponsorByIdResponse>();
        }
    }
}
