using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.DTOs;
using RunHub.Contracts.Responses;
using RunHub.Persistence;

namespace RunHub.Application.Queries.Races.GetRaces
{
    public class GetRacesQueryHandler : IRequestHandler<GetRacesQuery, GetRacesResponse>
    {
        private readonly DataContext _context;

        public GetRacesQueryHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<GetRacesResponse> Handle(GetRacesQuery request, CancellationToken cancellationToken)
        {
            var races = await _context.Races
                .Include(a => a.Address)
                .ToListAsync(cancellationToken);

            return races.Adapt<GetRacesResponse>();
        }
    }
}
