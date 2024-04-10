using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Errors;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Addresses.UpdateAddress
{
    public class UpdateAddressCommandHandler : IRequestHandler<UpdateAddressCommand, Result<Unit>>
    {
        private readonly DataContext _context;

        public UpdateAddressCommandHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<Unit>> Handle(UpdateAddressCommand request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                .Include(x => x.Address)
                .FirstOrDefaultAsync(x => x.RaceId == request.RaceId, cancellationToken);

            if(race == null) return null;

            if (race.Address == null)
            {
                race.Address = request.AddressDto.Adapt<Address>();
                _context.Addresses.Add(race.Address);
            }
            else
            {
                race.Address = request.AddressDto.Adapt(race.Address);
                _context.Addresses.Update(race.Address);
            }

            _context.Races.Update(race);

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Problem z aktualizacją adresu");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
