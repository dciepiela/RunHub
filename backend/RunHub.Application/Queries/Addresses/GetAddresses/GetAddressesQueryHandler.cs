using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Exceptions;
using RunHub.Contracts.Responses.Address;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Queries.Addresses.GetAddresses
{
    public class GetAddressesQueryHandler : IRequestHandler<GetAddressesQuery, GetAddressesResponse>
    {
        private readonly DataContext _context;

        public GetAddressesQueryHandler(DataContext context)
        {
            _context = context;
        }

        public Task<GetAddressesResponse> Handle(GetAddressesQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
