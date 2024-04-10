using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Application.Interfaces;
using RunHub.Contracts.Errors;
using RunHub.Persistence;

namespace RunHub.Application.Photos
{
    public class Delete
    {
        public record DeletePhotoCommand(string Id) : IRequest<Result<Unit>> { }

        public class DeletePhotoCommandHandler : IRequestHandler<DeletePhotoCommand, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;

            public DeletePhotoCommandHandler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
                _photoAccessor = photoAccessor;
            }
            public async Task<Result<Unit>> Handle(DeletePhotoCommand request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .Include(u => u.Photo)
                    .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var photo = user.Photo;

                var deletionResult = await _photoAccessor.DeletePhoto(photo.Id);

                var result = await _photoAccessor.DeletePhoto(photo.Id);

                if (deletionResult == null) return Result<Unit>.Failure("Problem z usunięciem zdjęcia z Cloudinary");

                _context.Photos.Remove(photo);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem z usunięciem zdjęcia z API");

            }
        }
    }
}
