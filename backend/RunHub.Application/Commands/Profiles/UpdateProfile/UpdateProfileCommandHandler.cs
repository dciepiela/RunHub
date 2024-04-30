using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Application.Interfaces;
using RunHub.Contracts.Errors;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Profiles.UpdateProfile
{
    public class UpdateProfileCommandHandler : IRequestHandler<UpdateProfileCommand, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public UpdateProfileCommandHandler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }
        public async Task<Result<Unit>> Handle(UpdateProfileCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .Include(u => u.Address)
                .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());
            
            user.DisplayName = request.DisplayName ?? user.DisplayName;
            user.FirstName = request.FirstName ?? user.FirstName;
            user.LastName = request.LastName ?? user.LastName;
            user.Club = request.Club ?? user.Club;
            user.Bio = request.Bio ?? user.Bio;
            user.Address.City = request.City ?? user.Address.City;
            user.Address.Street = request.Street ?? user.Address.Street;
            user.Address.PostalCode = request.PostalCode ?? user.Address.PostalCode;

            //always get code 200 when updating even if not change 
            _context.Entry(user).State = EntityState.Modified;

            var success = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (success) return Result<Unit>.Success(Unit.Value);

            return Result<Unit>.Failure("Problem z aktualizacją profilu.");
        }
    }
}
