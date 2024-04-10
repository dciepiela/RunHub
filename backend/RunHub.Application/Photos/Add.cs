using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using RunHub.Application.Interfaces;
using RunHub.Contracts.Errors;
using RunHub.Domain.Entities;
using RunHub.Persistence;

namespace RunHub.Application.Photos
{
    public class Add
    {
        public record AddPhotoCommand(IFormFile File) : IRequest<Result<Photo>> { }

        public class AddPhotoCommandHandler : IRequestHandler<AddPhotoCommand, Result<Photo>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IUserAccessor _userAccessor;

            public AddPhotoCommandHandler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                _context = context;
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Photo>> Handle(AddPhotoCommand request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .Include(u => u.Photo)
                    .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                // Delete existing photo if any
                if (user.Photo != null)
                {
                    await _photoAccessor.DeletePhoto(user.Photo.Id);
                    _context.Photos.Remove(user.Photo);
                }

                var photoUploadResult = await _photoAccessor.AddPhoto(request.File);

                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };

                user.Photo = photo;

                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<Photo>.Success(photo);

                return Result<Photo>.Failure("Problem z dodniem zdjęcia");
            }
        }


    }
}
