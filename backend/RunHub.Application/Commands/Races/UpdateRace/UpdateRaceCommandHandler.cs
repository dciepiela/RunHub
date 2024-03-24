using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Exceptions;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Races.UpdateRace
{
    public class UpdateRaceCommandHandler : IRequestHandler<UpdateRaceCommand, Unit>
    {
        private readonly DataContext _context;

        public UpdateRaceCommandHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(UpdateRaceCommand request, CancellationToken cancellationToken)
        {
            var raceToUpdate = await _context.Races
                .Include(r => r.Address)
                .FirstOrDefaultAsync(x => x.RaceId == request.RaceId, cancellationToken);

            if(raceToUpdate == null)
            {
                throw new NotFoundException($"{nameof(Race)} z {nameof(Race.RaceId)}: {request.RaceId}" + " nie zostało znalezione w bazie danych");
            }

            raceToUpdate.Name = request.Name;
            raceToUpdate.Description = request.Description;
            raceToUpdate.LastUpdateDate = DateTime.UtcNow;
            raceToUpdate.RegistrationEndDate = request.RegistrationEndDate;
            raceToUpdate.StartDateRace = request.StartDateRace;
            raceToUpdate.EndDateRace = request.EndDateRace;
            raceToUpdate.Image = request.Image;
            raceToUpdate.RaceStatus = request.RaceStatus;
            raceToUpdate.RaceType = request.RaceType;

            // Update address details if provided
            if (request.AddressDto != null)
            {
                // Map the AddressDto to Address entity
                var updatedAddress = _context.Addresses.FirstOrDefault(a => a.AddressId == raceToUpdate.Address.AddressId);

                if (updatedAddress == null)
                {
                    // Handle the case where the address does not exist
                    updatedAddress = new Address();
                    _context.Addresses.Add(updatedAddress);
                }

                updatedAddress.City = request.AddressDto.City;
                updatedAddress.Street = request.AddressDto.Street;
                updatedAddress.Country = request.AddressDto.Country;
                updatedAddress.PostalCode = request.AddressDto.PostalCode;

                // Update the race's address
                raceToUpdate.Address = updatedAddress;
            }

            _context.Races.Update(raceToUpdate);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
