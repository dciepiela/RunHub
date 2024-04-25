using MediatR;
using RunHub.Contracts.Errors;
using RunHub.Domain.Enum;

namespace RunHub.Application.Commands.Races.ChangeRaceStatus
{
    public record ChangeRaceStatusCommand(int RaceId, RaceStatus RaceStatus):IRequest<Result<Unit>>;
}
