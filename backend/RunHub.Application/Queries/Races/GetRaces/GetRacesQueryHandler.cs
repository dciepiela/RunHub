using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Application.Helpers;
using RunHub.Contracts.DTOs;
using RunHub.Contracts.DTOs.Race;
using RunHub.Contracts.Errors;
using RunHub.Contracts.Responses;
using RunHub.Persistence;

namespace RunHub.Application.Queries.Races.GetRaces
{
    public class GetRacesQueryHandler : IRequestHandler<GetRacesQuery, Result<PaginetedList<RaceDto>>>
    {
        private readonly DataContext _context;

        public GetRacesQueryHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<PaginetedList<RaceDto>>> Handle(GetRacesQuery request, CancellationToken cancellationToken)
        {
            var getRacesQuery = _context.Races
                .Include(r => r.Photo)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(request.SearchName))
            {
                getRacesQuery = getRacesQuery.Where(r => r.Name.Contains(request.SearchName));
            }

            if (!string.IsNullOrWhiteSpace(request.SortBy))
            {
                if(request.SortBy.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    getRacesQuery = request.IsDescending ? getRacesQuery.OrderByDescending(r => r.Name): getRacesQuery.OrderBy(r => r.Name);
                }
            }

            var paginatedList = await PaginetedList<RaceDto>.CreateAsync(getRacesQuery.ProjectToType<RaceDto>(), request.PaginationParams.PageNumber, 
                request.PaginationParams.PageSize); 
            
            return Result<PaginetedList<RaceDto>>.Success(paginatedList);
        }
    }
}
