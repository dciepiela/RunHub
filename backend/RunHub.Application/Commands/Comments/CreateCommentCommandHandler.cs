using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Application.Interfaces;
using RunHub.Contracts.DTOs.Comment;
using RunHub.Contracts.Errors;
using RunHub.Domain.Entities;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Comments
{
    public class CreateCommentCommandHandler : IRequestHandler<CreateCommentCommand, Result<CommentDto>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public CreateCommentCommandHandler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }
        public async Task<Result<CommentDto>> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                .FirstOrDefaultAsync(x => x.RaceId == request.raceId, cancellationToken);
               
            if (race == null) return null;

            var user = await _context.Users
                .Include(x => x.Photo)
                .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

            var comment = new Comment
            {
                Author = user,
                Race = race,
                CommentText = request.CommentText
            };

            race.Comments.Add(comment);

            var success = await _context.SaveChangesAsync() > 0;

            if (success) return Result<CommentDto>.Success(comment.Adapt<CommentDto>());

            return Result<CommentDto>.Failure("Problem z dodaniem komentarza");

        }
    }
}
