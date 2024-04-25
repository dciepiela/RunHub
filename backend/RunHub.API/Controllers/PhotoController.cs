using Microsoft.AspNetCore.Mvc;
using RunHub.Application.Commands.Races.AddRacePhoto;
using RunHub.Application.Photos;
using RunHub.Domain.Entity;

namespace RunHub.API.Controllers
{
    [Route("api/photos")]
    public class PhotoController:BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> AddUserPhoto([FromForm] Add.AddPhotoCommand command)
        {
            var result = await Mediator.Send(command);
            return HandleResult(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var result = await Mediator.Send(new Delete.DeletePhotoCommand(id));
            return HandleResult(result);
        }


        [HttpPost("{raceId}/photoRace")]
        public async Task<IActionResult> AddRacePhoto(int raceId, [FromForm] AddRacePhotoCommand command)
        {
            command.RaceId = raceId;
            var result = await Mediator.Send(command);
            return HandleResult(result);
        }
    }
}
