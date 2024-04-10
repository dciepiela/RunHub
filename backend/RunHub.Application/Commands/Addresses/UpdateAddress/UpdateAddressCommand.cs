using MediatR;
using RunHub.Contracts.DTOs;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Commands.Addresses.UpdateAddress
{
    public record UpdateAddressCommand(int RaceId, AddressDto AddressDto) : IRequest<Result<Unit>>;
}
