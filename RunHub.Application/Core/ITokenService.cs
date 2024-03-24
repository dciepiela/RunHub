using RunHub.Domain.Entity;

namespace RunHub.Application.Core
{
    public interface ITokenService
    {
        string CreateToken(AppUser user, IList<string> roles);
    }
}
