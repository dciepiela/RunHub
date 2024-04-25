using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Application.Interfaces;
using RunHub.Contracts.Errors;
using RunHub.Domain.Entities;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Races.CreateRaceWithCloudinary
{
    public class CreateRaceWithCloudinaryCommandHandler : IRequestHandler<CreateRaceWithCloudinaryCommand, Result<int>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        private readonly IPhotoAccessor _photoAccessor;

        public CreateRaceWithCloudinaryCommandHandler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
            _photoAccessor = photoAccessor;
        }
        public async Task<Result<int>> Handle(CreateRaceWithCloudinaryCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

            var address = new Address
            {
                City = request.RaceDto.AddressDto.City,
                Street = request.RaceDto.AddressDto.Street,
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
                RaceStatus = request.RaceDto.RaceStatus,
                RaceType = request.RaceDto.RaceType,
                CreatorAppUser = user,
                Address = address,
                Distances = new List<Distance>(),
                Sponsors = new List<Sponsor>()
            };

            // Handle the image file
            if (request.ImageFile != null && request.ImageFile.Length > 0)
            {
                var photoResult = await _photoAccessor.AddPhoto(request.ImageFile);
                race.Photo = new Photo
                {
                    Url = photoResult.Url,
                    Id = photoResult.PublicId
                };
            }

            foreach (var sponsorDto in request.RaceDto.Sponsors)
            {
                race.Sponsors.Add(new Sponsor
                {
                    Name = sponsorDto.Name,
                    Logo = sponsorDto.Logo,
                    Description = sponsorDto.Description,
                    WebPageUrl = sponsorDto.WebPageUrl,
                    Amount = sponsorDto.Amount,
                    SupportType = sponsorDto.SupportType
                });
            }
            foreach (var distanceDto in request.RaceDto.Distances)
            {
                race.Distances.Add(new Distance
                {
                    Name = distanceDto.Name,
                    LengthInKilometers = distanceDto.LengthInKilometers,
                    Description = distanceDto.Description,
                    AvailableSlots = distanceDto.AvailableSlots,
                    TotalSlots = distanceDto.TotalSlots,
                    Price = distanceDto.Price
                });
            }

            _context.Races.Add(race);
            var result = await _context.SaveChangesAsync(cancellationToken);

            if (result <= 0)
                return Result<int>.Failure("Failed to create the race");

            return Result<int>.Success(race.RaceId);
        }
    }
}
