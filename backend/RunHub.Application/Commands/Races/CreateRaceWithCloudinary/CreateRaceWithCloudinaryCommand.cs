using MediatR;
using Microsoft.AspNetCore.Http;
using RunHub.Contracts.DTOs.Race;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Commands.Races.CreateRaceWithCloudinary
{
    public record CreateRaceWithCloudinaryCommand(CreateRaceDto RaceDto, IFormFile ImageFile):IRequest<Result<int>>;
}
