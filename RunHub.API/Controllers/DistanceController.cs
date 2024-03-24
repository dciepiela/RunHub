using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RunHub.Application.Commands.DistanceAttendees.Attend;
using RunHub.Application.Commands.Distances.CreateDistance;
using RunHub.Application.Commands.Distances.DeleteDistance;
using RunHub.Application.Commands.Distances.UpdateDistance;
using RunHub.Application.Queries.Attendance;
using RunHub.Application.Queries.Distances.GetDistanceById;
using RunHub.Application.Queries.Distances.GetDistances;
using RunHub.Application.Queries.Races.ExistRace;
using RunHub.Contracts.Requests.Distances;
using RunHub.Contracts.Responses.Attendees;

namespace RunHub.API.Controllers
{
    [Route("api/distances")]
    public class DistanceController : BaseApiController
    {
        // GET: api/<DistanceController>
        
        [HttpGet("{raceId}")]
        public async Task<IActionResult> GetDistances(int raceId, CancellationToken ct)
        {
            var distances = await Mediator.Send(new GetDistancesQuery(raceId), ct);
            return Ok(distances);
        }

        [HttpGet("{raceId}/{distanceId}")]
        public async Task<IActionResult> GetDistanceById(int raceId, int distanceId, CancellationToken ct)
        {
            var distance = await Mediator.Send(new GetDistanceByIdQuery(raceId, distanceId), ct);

            return Ok(distance);
        }

        [HttpPost("{raceId}")]
        public async Task<IActionResult> CreateDistance([FromRoute] int raceId, CreateDistanceRequest createDistanceRequest, CancellationToken ct)
        {
            if (await Mediator.Send(new RaceExistsQuery(raceId)) == false) // check if a race exists
            {
                return NotFound();
            }

            var distanceCommand = new CreateDistanceCommand(raceId, createDistanceRequest.Name, createDistanceRequest.LengthInKilometers,
                createDistanceRequest.Description, createDistanceRequest.AvailableSlots, createDistanceRequest.TotalSlots,
                createDistanceRequest.Price);

            var result = await Mediator.Send(distanceCommand, ct);

            return Ok(result);
        }

        [HttpPut("{raceId}/{distanceId}")]
        public async Task<IActionResult> EditDistance(int raceId, int distanceId, UpdateDistanceRequest updateDistanceRequest, CancellationToken ct)
        {
            //if (await Mediator.Send(new RaceExistsQuery(raceId)) == false) // check if a race exists
            //{
            //    return NotFound();
            //}

            var updateCommand = new UpdateDistanceCommand(raceId, distanceId, updateDistanceRequest.Name, updateDistanceRequest.LengthInKilometers,
                updateDistanceRequest.Description, updateDistanceRequest.AvailableSlots, updateDistanceRequest.TotalSlots, 
                updateDistanceRequest.Price);
                
            var result = await Mediator.Send(updateCommand, ct);

            return Ok(result);
        }


        [HttpDelete("{raceId}/{distanceId}")]
        public async Task<IActionResult> DeleteDistance([FromRoute] int raceId,[FromRoute] int distanceId, CancellationToken ct)
        {
            var command = new DeleteDistanceCommand(raceId,distanceId);
            var result = await Mediator.Send(command, ct);
            return Ok(result);
        }

        //GetDistanceAttendees
        [AllowAnonymous]
        [HttpGet("{raceId}/{distanceId}/attendees")]
        public async Task<ActionResult<GetAttendeesResponse>> GetDistanceAttendees(int raceId, int distanceId, CancellationToken ct)
        {
            var query = new GetDistanceAttendeesQuery(raceId, distanceId);
            var result = await Mediator.Send(query, ct);

            // Sprawdzenie, czy wyścig istnieje
            if (result.AttendeesDto == null)
            {
                return NotFound("Race not found."); // Możesz dostosować komunikat błędu
            }

            return Ok(result);
        }

        // TO DO!!!!!!!!!!!!!
        //Attend
        [HttpPost("{raceId}/{distanceId}/attend")]
        public async Task<IActionResult> Attend([FromRoute] int raceId, [FromRoute] int distanceId, CancellationToken ct)
        {
            var command = new UpdateAttendeeCommand(raceId, distanceId);
            var result = await Mediator.Send(command,ct);
            return Ok(result);
        }
    }
}
