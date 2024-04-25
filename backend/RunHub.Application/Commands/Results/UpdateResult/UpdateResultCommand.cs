using MediatR;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Commands.Results.UpdateResult
{
    public record UpdateResultCommand(int ResultId, TimeSpan Time, int Place, int PlaceGender) : IRequest<Result<Unit>>;
}
