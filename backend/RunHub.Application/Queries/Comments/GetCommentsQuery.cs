using MediatR;
using RunHub.Contracts.DTOs.Comment;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Queries.Comments
{
    public class GetCommentsQuery: IRequest<Result<List<CommentDto>>>
    {
        public int RaceId { get; set; }
    }
}
