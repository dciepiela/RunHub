using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RunHub.Application.Commands.Results.DeleteResult;
using RunHub.Application.Commands.Results.UpdateResult;
using RunHub.Application.Queries.Distances.GetDistanceById;
using RunHub.Application.Queries.Distances.GetDistances;
using RunHub.Application.Queries.Results.GetResultsForDistance;
using RunHub.Contracts.DTOs.Result;

namespace RunHub.API.Controllers
{
    [Route("api/results")]

    public class ResultController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet("distance/{distanceId}")]
        public async Task<IActionResult> GetResultsForDistance(int distanceId, CancellationToken ct)
        {
            var distances = await Mediator.Send(new GetResultsForDistanceQuery(distanceId), ct);
            return HandleResult(distances);
        }

        [HttpPut("update/{resultId}")]
        public async Task<IActionResult> UpdateResult(int resultId, [FromBody] UpdateResultDto resultDto, CancellationToken ct)
        {
            var command = new UpdateResultCommand(resultId, resultDto.Time, resultDto.Place, resultDto.PlaceGender);
            var result = await Mediator.Send(command, ct);
            return HandleResult(result);
        }

        [HttpDelete("{resultId}")]
        public async Task<IActionResult> DeleteResult(int resultId, CancellationToken ct)
        {
            var command = new DeleteResultCommand(resultId);
            var result = await Mediator.Send(command, ct);
            return HandleResult(result);
        }


    }
}
