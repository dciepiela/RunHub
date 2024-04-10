using Microsoft.AspNetCore.Mvc;
using RunHub.Application.Photos;

namespace RunHub.API.Controllers
{
    [Route("api/photos")]
    public class PhotoController:BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] Add.AddPhotoCommand command)
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
    }
}
