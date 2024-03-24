using MediatR;

namespace RunHub.Application.Commands.Addresses.UpdateAddress
{
    public record UpdateAddressCommand(int RaceId, string City,string Street, string Country, string PostalCode) : IRequest<Unit>;
}
