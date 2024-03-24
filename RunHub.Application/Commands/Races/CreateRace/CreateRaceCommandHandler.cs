using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Application.Interfaces;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Races.CreateRace
{
    public class CreateRaceCommandHandler : IRequestHandler<CreateRaceCommand, int>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public CreateRaceCommandHandler(DataContext context, IUserAccessor userAccessor)
        {
            this._context = context;
            _userAccessor = userAccessor;
        }
        public async Task<int> Handle(CreateRaceCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => 
                x.UserName == _userAccessor.GetUsername());

            var address = new Address
            {
                City = request.AddressDto.City,
                Street = request.AddressDto.Street,
                Country = request.AddressDto.Country,
                PostalCode = request.AddressDto.PostalCode,
            };

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
                //CreatorAppUser = user,
                Address = address
            };


            await _context.Races.AddAsync(race, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return race.RaceId;
        }
    }
}
