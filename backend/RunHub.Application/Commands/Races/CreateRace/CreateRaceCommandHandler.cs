using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Application.Interfaces;
using RunHub.Contracts.Errors;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Races.CreateRace
{
    public class CreateRaceCommandHandler : IRequestHandler<CreateRaceCommand, Result<int>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public CreateRaceCommandHandler(DataContext context, IUserAccessor userAccessor)
        {
            this._context = context;
            _userAccessor = userAccessor;
        }
        public async Task<Result<int>> Handle(CreateRaceCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => 
                x.UserName == _userAccessor.GetUsername());

            var address = new Address
            {
                City = request.RaceDto.AddressDto.City,
                Street = request.RaceDto.AddressDto.Street,
                Country = request.RaceDto.AddressDto.Country,
                PostalCode = request.RaceDto.AddressDto.PostalCode,
            };

            var race = new Race
            {
                Name = request.RaceDto.Name,
                Description = request.RaceDto.Description,
                CreationDate = DateTime.UtcNow,
                LastUpdateDate = DateTime.UtcNow,
                RegistrationEndDate = request.RaceDto.RegistrationEndDate,
                StartDateRace = request.RaceDto.StartDateRace,
                EndDateRace = request.RaceDto.EndDateRace,
                Image = request.RaceDto.Image,
                RaceStatus = request.RaceDto.RaceStatus,
                RaceType = request.RaceDto.RaceType,
                CreatorAppUser = user,
                Address = address
            };

            // Adding sponsors to the race
            if (request.RaceDto.Sponsors != null)
            {
                foreach (var sponsorDto in request.RaceDto.Sponsors)
                {
                    var sponsor = new Sponsor
                    {
                        Name = sponsorDto.Name,
                        Logo = sponsorDto.Logo,
                        Description = sponsorDto.Description,
                        WebPageUrl = sponsorDto.WebPageUrl,
                        Amount = sponsorDto.Amount,
                        SupportType = sponsorDto.SupportType
                    };

                    race.Sponsors.Add(sponsor);
                }
            }

            // Adding distances to the race
            if (request.RaceDto.Distances != null)
            {
                foreach (var distanceDto in request.RaceDto.Distances)
                {
                    var distance = new Distance
                    {
                        Name = distanceDto.Name,
                        LengthInKilometers = distanceDto.LengthInKilometers,
                        Description = distanceDto.Description,
                        AvailableSlots = distanceDto.AvailableSlots,
                        TotalSlots = distanceDto.TotalSlots,
                        Price = distanceDto.Price
                    };

                    race.Distances.Add(distance);
                }
            }


            await _context.Races.AddAsync(race, cancellationToken);
            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<int>.Failure("Problem z utworzeniem biegu");

            return Result<int>.Success(race.RaceId);
        }
    }
}
