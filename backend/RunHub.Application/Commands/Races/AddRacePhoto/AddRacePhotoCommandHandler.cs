using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Application.Interfaces;
using RunHub.Contracts.Errors;
using RunHub.Domain.Entities;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Races.AddRacePhoto
{
    public class AddRacePhotoCommandHandler : IRequestHandler<AddRacePhotoCommand, Result<Photo>>
    {
        private readonly DataContext _context;
        private readonly IPhotoAccessor _photoAccessor;

        public AddRacePhotoCommandHandler(DataContext context, IPhotoAccessor photoAccessor)
        {
            _context = context;
            _photoAccessor = photoAccessor;
        }

        public async Task<Result<Photo>> Handle(AddRacePhotoCommand request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                .Include(r => r.Photo)
                .FirstOrDefaultAsync(x => x.RaceId == request.RaceId);

            if (race == null) return null;

            if(race.Photo != null)
            {
                await _photoAccessor.DeletePhoto(race.Photo.Id);
                _context.Photos.Remove(race.Photo);
            }

            var photoUploadResult = await _photoAccessor.AddPhoto(request.File);

            var photo = new Photo
            {
                Url = photoUploadResult.Url,
                Id = photoUploadResult.PublicId,
            };

            race.Photo = photo;
            var result = await _context.SaveChangesAsync(cancellationToken) > 0;
            if (result)
            {
                return Result<Photo>.Success(photo);
            }

            return Result<Photo>.Failure("Problem z dodaniem zdjęcia");
        }
    }
}
