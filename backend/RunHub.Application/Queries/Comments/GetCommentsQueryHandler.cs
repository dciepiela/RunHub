using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.DTOs.Comment;
using RunHub.Contracts.Errors;
using RunHub.Persistence;

namespace RunHub.Application.Queries.Comments
{
    public class GetCommentsQueryHandler : IRequestHandler<GetCommentsQuery, Result<List<CommentDto>>>
    {
        private readonly DataContext _context;

        public GetCommentsQueryHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<List<CommentDto>>> Handle(GetCommentsQuery request, CancellationToken cancellationToken)
        {
            var comments = await _context.Comments
                .Where(x => x.Race.RaceId == request.RaceId)
                .OrderByDescending(x => x.CreateadAt)
                .ProjectToType<CommentDto>()
                .ToListAsync(cancellationToken);

            return Result<List<CommentDto>>.Success(comments);
        }
    }
}
