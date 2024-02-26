using MediatR;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Races.CreateRace
{
    public class CreateRaceCommandHandler : IRequestHandler<CreateRaceCommand, int>
    {
        private readonly DataContext _context;

        public CreateRaceCommandHandler(DataContext _context)
        {
            this._context = _context;
        }
        public async Task<int> Handle(CreateRaceCommand request, CancellationToken cancellationToken)
        {
            var race = new Race
            {
                Name = request.Name,
                Description = request.Description,
                CreationDate = DateTime.UtcNow,
                LastUpdateDate = DateTime.UtcNow,
                RegistrationEndDate = request.RegistrationEndDate,
                StartDateRace = request.StartDateRace,
                EndDateRace = request.EndDateRace,
                Image = request.Image,
                RaceStatus = request.RaceStatus,
                RaceType = request.RaceType,
                CreatorAppUserId = request.CreatorAppUserId,
                Address = request.Address
            };

            await _context.Races.AddAsync(race, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return race.RaceId;
        }
    }
}
