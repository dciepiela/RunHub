using MediatR;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Commands.Distances.DisplayDistanceResult
{
    public record UpdateIsReadyToShowCommand(int DistanceId, bool IsReadyToShow) : IRequest<Result<Unit>>;
}
