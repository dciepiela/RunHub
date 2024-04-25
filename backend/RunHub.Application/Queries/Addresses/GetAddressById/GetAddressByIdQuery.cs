using MediatR;
using RunHub.Contracts.DTOs;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Queries.Addresses.GetAddressById
{
    public record GetAddressByIdQuery(int RaceId) : IRequest<Result<AddressDto>>;
}
