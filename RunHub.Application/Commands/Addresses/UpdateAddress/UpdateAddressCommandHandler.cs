using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Application.Commands.Races.UpdateRace;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Addresses.UpdateAddress
{
    public class UpdateAddressCommandHandler : IRequestHandler<UpdateAddressCommand, Unit>
    {
        private readonly DataContext _context;

        public UpdateAddressCommandHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(UpdateAddressCommand request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                .Include(x => x.Address)
                .FirstOrDefaultAsync(x => x.RaceId == request.RaceId, cancellationToken);

            if (race != null)
            {
                if (race.Address == null)
                {
                    race.Address = new Address(); // Create new Address if it doesn't exist
                    _context.Addresses.Add(race.Address); // Add it to context
                }

                race.Address.City = request.City;
                race.Address.Street = request.Street;
                race.Address.Country = request.Country;
                race.Address.PostalCode = request.PostalCode;

                _context.Races.Update(race);


                await _context.SaveChangesAsync(cancellationToken);
            }

            return Unit.Value;
        }
    }
}
