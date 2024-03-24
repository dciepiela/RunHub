using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Exceptions;
using RunHub.Contracts.Responses.Address;
using RunHub.Contracts.Responses.Races;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Queries.Addresses.GetAddressById
{
    public class GetAddressByIdQueryHandler : IRequestHandler<GetAddressByIdQuery, GetAddressByIdResponse>
    {
        private readonly DataContext _context;

        public GetAddressByIdQueryHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<GetAddressByIdResponse> Handle(GetAddressByIdQuery request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                .Include(x => x.Address)
                .SingleOrDefaultAsync(x => x.RaceId == request.RaceId, cancellationToken);

            if (race == null)
            {
                throw new NotFoundException($"{nameof(Race)} z {nameof(Race.RaceId)}: {request.RaceId}" + " nie zostało znalezione w bazie danych");
            }

            var address = race.Address;
            //if (race != null)
            //{
            //    if (race.Address == null)
            //    {
            //        race.Address = new Address(); // Create new Address if it doesn't exist
            //        _context.Addresses.Add(race.Address); // Add it to context
            //    }

            //    race.Address.City = request.City;
            //    race.Address.Street = request.Street;
            //    race.Address.Country = request.Country;
            //    race.Address.PostalCode = request.PostalCode;

            //    await _context.SaveChangesAsync(cancellationToken);
            //}

            return address.Adapt<GetAddressByIdResponse>();

        }
    }
}
