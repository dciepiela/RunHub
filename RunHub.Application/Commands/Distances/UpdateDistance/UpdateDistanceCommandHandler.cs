using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Exceptions;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Distances.UpdateDistance
{
    public class UpdateDistanceCommandHandler : IRequestHandler<UpdateDistanceCommand, Unit>
    {
        private readonly DataContext _context;

        public UpdateDistanceCommandHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(UpdateDistanceCommand request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                .Include(x => x.Distances)
                .FirstOrDefaultAsync(x => x.RaceId == request.RaceId, cancellationToken);

            if (race == null)
            {
                throw new NotFoundException($"Race containing ID {request.RaceId} was not found in the database");
            }

            var distanceToUpdate = race.Distances.FirstOrDefault(x => x.DistanceId == request.DistanceId);

            if(distanceToUpdate is null)
            {
                throw new NotFoundException($"Distance with ID {request.DistanceId} was not found in the race");
            }

            distanceToUpdate.Name = request.Name;
            distanceToUpdate.LengthInKilometers = request.LengthInKilometers;
            distanceToUpdate.Description = request.Description;
            distanceToUpdate.AvailableSlots = request.AvailableSlots;
            distanceToUpdate.TotalSlots = request.TotalSlots;
            distanceToUpdate.Price = request.Price;


            _context.Distances.Update(distanceToUpdate);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
