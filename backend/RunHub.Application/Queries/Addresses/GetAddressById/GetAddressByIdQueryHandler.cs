using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.DTOs;
using RunHub.Contracts.Errors;
using RunHub.Persistence;

namespace RunHub.Application.Queries.Addresses.GetAddressById
{
    public class GetAddressByIdQueryHandler : IRequestHandler<GetAddressByIdQuery, Result<AddressDto>>
    {
        private readonly DataContext _context;

        public GetAddressByIdQueryHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<AddressDto>> Handle(GetAddressByIdQuery request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                .Include(x => x.Address)
                .SingleOrDefaultAsync(x => x.RaceId == request.RaceId, cancellationToken);

            if (race == null) return null;

            var address = race.Address;

            var addressRespone = address.Adapt<AddressDto>();
            return Result<AddressDto>.Success(addressRespone);

        }
    }
}
