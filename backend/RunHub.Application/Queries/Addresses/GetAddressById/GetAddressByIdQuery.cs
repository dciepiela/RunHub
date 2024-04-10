using MediatR;
using RunHub.Contracts.DTOs;
using RunHub.Contracts.Errors;
using RunHub.Contracts.Responses.Address;

namespace RunHub.Application.Queries.Addresses.GetAddressById
{
    public record GetAddressByIdQuery(int RaceId) : IRequest<Result<AddressDto>>;
}
