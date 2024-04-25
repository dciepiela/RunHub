using MediatR;
using Microsoft.AspNetCore.Http;
using RunHub.Contracts.DTOs.Race;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Commands.Races.CreateRace
{
    public record CreateRaceCommand(CreateRaceDto RaceDto) : IRequest<Result<int>>;
}
