using MediatR;
using RunHub.Contracts.Responses.Address;

namespace RunHub.Application.Queries.Addresses.GetAddresses
{
    public record GetAddressesQuery(int RaceId):IRequest<GetAddressesResponse>;
}
