using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Exceptions;
using RunHub.Domain.Entity;
using RunHub.Persistence;
using System.Diagnostics;

namespace RunHub.Application.Commands.Distances.CreateDistance
{
    public class CreateDistanceCommandHandler : IRequestHandler<CreateDistanceCommand, int>
    {
        private readonly DataContext _context;

        public CreateDistanceCommandHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<int> Handle(CreateDistanceCommand request, CancellationToken cancellationToken)
        {
            var race = await _context.Races.FirstOrDefaultAsync(x => x.RaceId == request.RaceId);

            if (race == null)
            {
                throw new NotFoundException("Nie ma takiego biegu");
            }

            var distance = new Distance
            {
                Name = request.Name,
                LengthInKilometers = request.LengthInKilometers,
                Description = request.Description,
                AvailableSlots = request.AvailableSlots,
                TotalSlots = request.TotalSlots,
                Price = request.Price,
                RaceId = race.RaceId
            };

            await _context.Distances.AddAsync(distance,cancellationToken);
            var id = await _context.SaveChangesAsync(cancellationToken);

            return id;
        }
    }
}
