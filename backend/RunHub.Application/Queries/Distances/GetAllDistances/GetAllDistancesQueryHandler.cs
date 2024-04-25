using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.DTOs.Distance;
using RunHub.Contracts.Errors;
using RunHub.Persistence;

namespace RunHub.Application.Queries.Distances.GetAllDistances
{
    public class GetAllDistancesQueryHandler : IRequestHandler<GetAllDistancesQuery, Result<List<DistanceDto>>>
    {
        private readonly DataContext _context;

        public GetAllDistancesQueryHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<List<DistanceDto>>> Handle(GetAllDistancesQuery request, CancellationToken cancellationToken)
        {
            var distances = await _context.Distances
                .Include(d => d.DistanceAttendees)
                    .ThenInclude(da => da.Participator) 
                .Include(d => d.Results) 
                .Include(d => d.Race) 
                    .ThenInclude(d => d.CreatorAppUser)
                .ToListAsync(cancellationToken);

            if (!distances.Any())
            {
                return Result<List<DistanceDto>>.Failure("Nie znaleziono dystansu");
            }

            var result = distances.Adapt<List<DistanceDto>>();
            return Result<List<DistanceDto>>.Success(result);
        }
    }
}
