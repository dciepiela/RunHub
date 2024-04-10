using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Errors;
using RunHub.Contracts.Exceptions;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Races.UpdateRace
{
    public class UpdateRaceCommandHandler : IRequestHandler<UpdateRaceCommand, Result<Unit>>
    {
        private readonly DataContext _context;

        public UpdateRaceCommandHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<Unit>> Handle(UpdateRaceCommand request, CancellationToken cancellationToken)
        {
            //var raceToUpdate = await _context.Races
            //    .Include(r => r.Address)
            //    .Include(r => r.Distances)
            //    .Include(r => r.Sponsors)
            //    .FirstOrDefaultAsync(x => x.RaceId == request.RaceId, cancellationToken);

            var race = await _context.Races
                .FindAsync(request.RaceDto.RaceId);

            if (race == null) return null;

            race = request.RaceDto.Adapt(race);



            //// Update address details if provided
            //if (request.RaceDto.AddressDto != null)
            //{
            //    // Map the AddressDto to Address entity
            //    var updatedAddress = _context.Addresses.FirstOrDefault(a => a.AddressId == request.RaceDto.AddressDto.);

            //    if (updatedAddress == null)
            //    {
            //        // Handle the case where the address does not exist
            //        updatedAddress = new Address();
            //        _context.Addresses.Add(updatedAddress);
            //    }

            //    updatedAddress.City = request.AddressDto.City;
            //    updatedAddress.Street = request.AddressDto.Street;
            //    updatedAddress.Country = request.AddressDto.Country;
            //    updatedAddress.PostalCode = request.AddressDto.PostalCode;

            //    // Update the race's address
            //    raceToUpdate.Address = updatedAddress;
            //}

            _context.Races.Update(race);
            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Problem z aktualizacją biegu");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
