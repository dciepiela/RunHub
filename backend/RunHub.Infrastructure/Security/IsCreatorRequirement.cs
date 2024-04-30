using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
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
        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsCreatorRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return;

            var request = _httpContextAccessor.HttpContext?.Request.Path.Value;
            if (string.IsNullOrEmpty(request)) return;

            var segments = request.TrimStart('/').Split('/');
            if (segments.Length < 3 || !int.TryParse(segments[2], out int raceId)) return;

            var isCreator = await _dbContext.Races
                .AsNoTracking()
                .Where(r => r.RaceId == raceId)
                .Select(r => r.CreatorAppUser.Id)
                .SingleOrDefaultAsync() == userId;

            if (isCreator)
            {
                context.Succeed(requirement);
            }
        }
    }
}
