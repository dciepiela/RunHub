using MediatR;
using RunHub.Contracts.DTOs.Comment;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Commands.Comments
{
    public record CreateCommentCommand(string CommentText, int raceId) : IRequest<Result<CommentDto>>;
}
