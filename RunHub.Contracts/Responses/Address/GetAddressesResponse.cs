using RunHub.Contracts.DTOs;

namespace RunHub.Contracts.Responses.Address
{
    public record GetAddressesResponse(List<AddressDto> AddressDtos);
}
