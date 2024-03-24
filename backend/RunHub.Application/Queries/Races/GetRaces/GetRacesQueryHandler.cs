using Mapster;
using MediatR;
using RunHub.Application.Helpers;
using RunHub.Contracts.DTOs;
using RunHub.Contracts.Responses;
using RunHub.Persistence;

namespace RunHub.Application.Queries.Races.GetRaces
{
    public class GetRacesQueryHandler : IRequestHandler<GetRacesQuery, PaginetedList<RaceDto>>
    {
        private readonly DataContext _context;

        public GetRacesQueryHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<PaginetedList<RaceDto>> Handle(GetRacesQuery request, CancellationToken cancellationToken)
        {
            //var races = await _context.Races
            //    .Include(a => a.Address)
            //    .ToListAsync(cancellationToken);

            var getRacesQuery = _context.Races.ProjectToType<RaceDto>().AsQueryable();

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

            var paginatedList = await CollectionHelper<RaceDto>.ToPaginatedList(getRacesQuery,request.PaginationParams.PageNumber,request.PaginationParams.PageSize);

            return paginatedList;
            //return races.Adapt<GetRacesResponse>();
        }
    }
}
