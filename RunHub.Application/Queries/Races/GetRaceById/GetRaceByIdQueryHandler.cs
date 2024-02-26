using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.DTOs;
using RunHub.Contracts.Exceptions;
using RunHub.Contracts.Responses;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Queries.Races.GetRaceById
{
    public class GetRaceByIdQueryHandler : IRequestHandler<GetRaceByIdQuery, GetRaceByIdResponse>
    {
        private readonly DataContext _context;

        public GetRaceByIdQueryHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<GetRaceByIdResponse> Handle(GetRaceByIdQuery request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                .Include(x => x.Address)
                .FirstOrDefaultAsync(x => x.RaceId == request.RaceId, cancellationToken);
            
            if(race == null)
            {
                throw new NotFoundException($"{nameof(Race)} z {nameof(Race.RaceId)}: {request.RaceId}" + " nie zostało znalezione w bazie danych" );
            }

            return race.Adapt<GetRaceByIdResponse>();
        }
    }
}
