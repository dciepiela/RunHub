using MediatR;
using RunHub.Contracts.DTOs;
using RunHub.Contracts.Requests;
using RunHub.Contracts.Responses;

namespace RunHub.Application.Queries.Races.GetRaces
{
    public record GetRacesQuery (PaginationParams PaginationParams, 
        string SearchName = null, 
        string SortBy = null,
        bool IsDescending = false
        ) : IRequest<PaginetedList<RaceDto>>;
}
