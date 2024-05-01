using FluentValidation;

namespace RunHub.Application.Commands.Comments
{
    public class CreateCommentValidator:AbstractValidator<CreateCommentCommand>
    {
        public CreateCommentValidator()
        {
            RuleFor(x => x.CommentText).NotEmpty();
        }
    }
}
