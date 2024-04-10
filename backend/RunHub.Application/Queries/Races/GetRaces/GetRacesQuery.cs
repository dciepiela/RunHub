using MediatR;
using RunHub.Contracts.DTOs.Race;
using RunHub.Contracts.Errors;
using RunHub.Contracts.Requests;
using RunHub.Contracts.Responses;

namespace RunHub.Application.Queries.Races.GetRaces
{
    public record GetRacesQuery (PaginationParams PaginationParams, 
        string SearchName = null, 
        string SortBy = null,
        bool IsDescending = false
        ) : IRequest<Result<PaginetedList<RaceDto>>>;
}
