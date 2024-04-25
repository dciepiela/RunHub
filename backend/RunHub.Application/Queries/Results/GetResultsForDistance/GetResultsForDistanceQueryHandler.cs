using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.DTOs.Distance;
using RunHub.Contracts.DTOs.Result;
using RunHub.Contracts.Errors;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Queries.Results.GetResultsForDistance
{
    public class GetResultsForDistanceQueryHandler : IRequestHandler<GetResultsForDistanceQuery, Result<List<ResultDto>>>
    {
        private readonly DataContext _context;

        public GetResultsForDistanceQueryHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<List<ResultDto>>> Handle(GetResultsForDistanceQuery request, CancellationToken cancellationToken)
        {
            var resultDtos = await _context.Results
                        .Where(r => r.DistanceId == request.distanceId)
                        .ProjectToType<ResultDto>()
                        .ToListAsync(cancellationToken);

            if (!resultDtos.Any())
            {
                return Result<List<ResultDto>>.Failure("Brak wyników dla podanego dystansu");
            }

            return Result<List<ResultDto>>.Success(resultDtos);
        }
    }
}
