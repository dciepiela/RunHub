using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Persistence;

namespace RunHub.Application.Queries.Races.ExistRace
{
    public class RaceExistsQueryHandler : IRequestHandler<RaceExistsQuery, bool>
    {
        private readonly DataContext _context;

        public RaceExistsQueryHandler(DataContext context)
        {
            _context = context;
        }
        public Task<bool> Handle(RaceExistsQuery request, CancellationToken cancellationToken)
        {
            return _context.Races.AnyAsync(s => s.RaceId == request.RaceId);
        }
    }
}
