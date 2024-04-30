

using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Application.Interfaces;
using RunHub.Contracts.DTOs.Distance;
using RunHub.Contracts.DTOs.Race;
using RunHub.Contracts.Errors;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Queries.Races.GetRacesForHost
{
    public class GetRacesForHostQueryHandler : IRequestHandler<GetRacesForHostQuery, Result<List<RaceDto>>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public GetRacesForHostQueryHandler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }
        public async Task<Result<List<RaceDto>>> Handle(GetRacesForHostQuery request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x =>
               x.UserName == _userAccessor.GetUsername());

            if (user == null)
            {
                return null;
            }

            var races = await _context.Races
                .Include(r => r.Address)
                .Where(x => x.CreatorAppUser.UserName ==  _userAccessor.GetUsername())
                .AsQueryable()
                .ToListAsync(cancellationToken);


            var result = races.Adapt<List<RaceDto>>();
            return Result<List<RaceDto>>.Success(result);
        }
    }
}
