using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Application.Interfaces;
using RunHub.Contracts.Errors;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Profiles.AddInfoAfterRegister
{
    public class AddInfoAfterRegisterCommandHandler : IRequestHandler<AddInfoAfterRegisterCommand, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public AddInfoAfterRegisterCommandHandler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }
        public async Task<Result<Unit>> Handle(AddInfoAfterRegisterCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .Include(u => u.Address)
                .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

            if (user == null)
                return Result<Unit>.Failure("User not found.");

            if (user.Address == null)
            {
                user.Address = new Address
                {
                    City = request.ProfileAfterRegisterDto.City,
                    Street = request.ProfileAfterRegisterDto.Street,
                    PostalCode = request.ProfileAfterRegisterDto.PostalCode
                };
            }
            else
            {
                user.Address.City = request.ProfileAfterRegisterDto.City ?? user.Address.City;
                user.Address.Street = request.ProfileAfterRegisterDto.Street ?? user.Address.Street;
                user.Address.PostalCode = request.ProfileAfterRegisterDto.PostalCode ?? user.Address.PostalCode;
            }

            user.Club = request.ProfileAfterRegisterDto.Club ?? user.Club;
            user.DateOfBirth = request.ProfileAfterRegisterDto.DateOfBirth;
            user.Gender = request.ProfileAfterRegisterDto.Gender ?? user.Gender;

            _context.Entry(user).State = EntityState.Modified;

            var success = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (success) return Result<Unit>.Success(Unit.Value);

            return Result<Unit>.Failure("Problem z dodaniem danych.");

        }
    }
}
