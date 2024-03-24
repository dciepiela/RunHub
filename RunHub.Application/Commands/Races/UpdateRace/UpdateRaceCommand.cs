using MediatR;
using RunHub.Contracts.DTOs;
using RunHub.Domain.Enum;

namespace RunHub.Application.Commands.Races.UpdateRace
{
    public record UpdateRaceCommand(int RaceId, string Name, 
        string Description, DateTime RegistrationEndDate, 
        DateTime StartDateRace, DateTime EndDateRace, 
        string Image, RaceStatus RaceStatus, RaceType RaceType, AddressDto? AddressDto) : IRequest<Unit>;
}
