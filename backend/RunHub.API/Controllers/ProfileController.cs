using Microsoft.AspNetCore.Mvc;
using RunHub.Application.Queries.Profiles.Details;

namespace RunHub.API.Controllers
{
    [Route("api/profiles")]
    public class ProfileController : BaseApiController
    {
        [HttpGet("{userName}")]
        public async Task<IActionResult> GetProfile(string userName)
        {
            var result = await Mediator.Send(new GetProfileByIdQuery(userName));
            return HandleResult(result);
        }
    }
}
