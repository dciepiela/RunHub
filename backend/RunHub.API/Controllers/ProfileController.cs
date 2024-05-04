using Microsoft.AspNetCore.Mvc;
using RunHub.Application.Commands.Profiles.AddInfoAfterRegister;
using RunHub.Application.Commands.Profiles.UpdateProfile;
using RunHub.Application.Queries.Profiles.Details;
using RunHub.Application.Queries.Profiles.ListDistances;
using RunHub.Contracts.DTOs.Profile;

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

        [HttpPut]
        public async Task<IActionResult> EditProfile(UpdateProfileCommand command)
        {
            var result = await Mediator.Send(command);
            return HandleResult(result);
        }

        [HttpGet("{userName}/distances")]
        public async Task<IActionResult> GetUserDistances(string userName, string predicate)
        {
            var result = await Mediator.Send(new ListDistancesQuery(userName, predicate));
            return HandleResult(result);
        }

        [HttpPut("afterGoogleLogin")]
        public async Task<IActionResult> EditProfileAfterGoogleLogin(ProfileAfterRegisterDto profileDto)
        {
            var command = new AddInfoAfterRegisterCommand(profileDto);
            var result = await Mediator.Send(command);
            return HandleResult(result);
        }
    }
}
