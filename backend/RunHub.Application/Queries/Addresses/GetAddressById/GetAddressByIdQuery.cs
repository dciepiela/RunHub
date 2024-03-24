using MediatR;
using RunHub.Contracts.Responses.Address;

namespace RunHub.Application.Queries.Addresses.GetAddressById
{
    public record GetAddressByIdQuery(int RaceId) : IRequest<GetAddressByIdResponse>;
}
