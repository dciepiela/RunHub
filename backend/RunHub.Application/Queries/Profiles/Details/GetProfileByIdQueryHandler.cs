using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.DTOs.Profile;
using RunHub.Contracts.Errors;
using RunHub.Persistence;

namespace RunHub.Application.Queries.Profiles.Details
{
    public class GetProfileByIdQueryHandler : IRequestHandler<GetProfileByIdQuery, Result<Profile>>
    {
        private readonly DataContext _context;

        public GetProfileByIdQueryHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<Profile>> Handle(GetProfileByIdQuery request, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .Include(u => u.Photo)
                .Include(u=> u.Address)
                .SingleOrDefaultAsync(x => x.UserName == request.UserName);

            if(user == null)
            {
                return null;
            }

            var userResponse = user.Adapt<Profile>();


            return Result<Profile>.Success(userResponse);
        }
    }
}
