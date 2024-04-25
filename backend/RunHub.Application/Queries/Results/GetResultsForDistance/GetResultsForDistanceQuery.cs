using MediatR;
using RunHub.Contracts.DTOs.Result;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Queries.Results.GetResultsForDistance
{
    public record GetResultsForDistanceQuery(int distanceId) : IRequest<Result<List<ResultDto>>>;
}
