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

        [AllowAnonymous]
        [HttpGet("{raceId}")]
        public async Task<IActionResult> GetDistances(int raceId, CancellationToken ct)
        {
            var distances = await Mediator.Send(new GetDistancesQuery(raceId), ct);
            return HandleResult(distances);
        }

        [AllowAnonymous]
        [HttpGet("{raceId}/{distanceId}")]
        public async Task<IActionResult> GetDistanceById(int raceId, int distanceId, CancellationToken ct)
        {
            var distance = await Mediator.Send(new GetDistanceByIdQuery(raceId, distanceId), ct);

            return HandleResult(distance);
        }

        [HttpPut("update/{resultId}")]
        public async Task<IActionResult> UpdateResult(int resultId, [FromBody] UpdateResultDto dto, CancellationToken ct)
        {
            var command = new UpdateResultCommand(resultId, dto.Time, dto.Place,dto.PlaceGender);
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
