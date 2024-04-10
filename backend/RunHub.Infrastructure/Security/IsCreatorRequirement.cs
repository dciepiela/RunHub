using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using RunHub.Persistence;
using System.Security.Claims;

namespace RunHub.Infrastructure.Security
{
    public class IsCreatorRequirement : IAuthorizationRequirement
    {

    }
    public class IsCreatorRequirementHandler : AuthorizationHandler<IsCreatorRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsCreatorRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _httpContextAccessor = httpContextAccessor;
        }
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsCreatorRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Task.CompletedTask;
            }

            var request = _httpContextAccessor.HttpContext?.Request.Path.Value;

            
            var raceIdString = request.TrimStart('/').Split('/')[2];


            if(!int.TryParse(raceIdString, out int raceId))
            {
                return Task.CompletedTask;
            }


            var race = _dbContext.Races
                .AsNoTracking()
                .Include(r => r.CreatorAppUser)
                .SingleOrDefault(r => r.RaceId == raceId);

            if (race == null)
            {
                return Task.CompletedTask;
            }

            if (race.CreatorAppUser != null && race.CreatorAppUser.Id == userId)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}
