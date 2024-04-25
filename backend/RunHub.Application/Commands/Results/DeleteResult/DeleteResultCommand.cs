using MediatR;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Commands.Results.DeleteResult
{
    public record DeleteResultCommand(int ResultId):IRequest<Result<Unit>>;

}
