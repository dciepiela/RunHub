using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Errors;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Races.UpdateOnlyRace
{
    public class UpdateOnlyRaceCommandHandler : IRequestHandler<UpdateOnlyRaceCommand, Result<Unit>>
    {
        private readonly DataContext _context;

        public UpdateOnlyRaceCommandHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<Unit>> Handle(UpdateOnlyRaceCommand request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                .Include(r => r.Address)
                .FirstOrDefaultAsync(x => x.RaceId == request.RaceDto.RaceId, cancellationToken);

            if (race == null) return null;

            race.Name = request.RaceDto.Name;
            race.Description = request.RaceDto.Description;
            race.RegistrationEndDate = request.RaceDto.RegistrationEndDate;
            race.StartDateRace = request.RaceDto.StartDateRace;
            race.EndDateRace = request.RaceDto.EndDateRace;
            race.RaceStatus = request.RaceDto.RaceStatus;
            race.RaceType = request.RaceDto.RaceType;


            // Update address properties if provided
            if (request.RaceDto.AddressDto != null)
            {
                race.Address = request.RaceDto.AddressDto.Adapt<Address>(); // Assuming you are using a mapping library like Mapster
            }

            var result = await _context.SaveChangesAsync() > 0;


            if (!result)
            {
                return Result<Unit>.Failure("Problem z aktualizacją biegu");
            }

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
