using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RunHub.Application.Commands.DistanceAttendees.Attend;
using RunHub.Application.Commands.DistanceAttendees.AttendWithPayment;
using RunHub.Application.Commands.Distances.CreateDistance;
using RunHub.Application.Commands.Distances.DeleteDistance;
using RunHub.Application.Commands.Distances.UpdateDistance;
using RunHub.Application.Queries.Attendance;
using RunHub.Application.Queries.Distances.GetDistanceById;
using RunHub.Application.Queries.Distances.GetDistances;
using RunHub.Contracts.DTOs.Distance;
using RunHub.Contracts.DTOs.Payments;

namespace RunHub.API.Controllers
{
    [Route("api/distances")]
    public class DistanceController : BaseApiController
    {
        private readonly ILogger<DistanceController> _logger;

        public DistanceController(ILogger<DistanceController> logger)
        {

            _logger = logger;

        }
        // GET: api/<DistanceController>

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

        [HttpPost("{raceId}")]
        public async Task<IActionResult> CreateDistance(int raceId, CreateDistanceDto distanceDto, CancellationToken ct)
        {
            var distanceCommand = new CreateDistanceCommand(raceId, distanceDto);

            var result = await Mediator.Send(distanceCommand, ct);

            return HandleResult(result);
        }

        [HttpPut("{raceId}/{distanceId}")]
        public async Task<IActionResult> EditDistance(int raceId, int distanceId, UpdateDistanceDto distanceDto, CancellationToken ct)
        {
            distanceDto.DistanceId = distanceId;
            var updateCommand = new UpdateDistanceCommand(raceId, distanceDto);
                
            var result = await Mediator.Send(updateCommand, ct);

            return HandleResult(result);
        }


        [HttpDelete("{raceId}/{distanceId}")]
        public async Task<IActionResult> DeleteDistance([FromRoute] int raceId,[FromRoute] int distanceId, CancellationToken ct)
        {
            var command = new DeleteDistanceCommand(raceId,distanceId);
            var result = await Mediator.Send(command, ct);
            return HandleResult(result);
        }

        //GetDistanceAttendees
        [AllowAnonymous]
        [HttpGet("{raceId}/{distanceId}/attendees")]
        public async Task<IActionResult> GetDistanceAttendees(int raceId, int distanceId, CancellationToken ct)
        {
            var query = new GetDistanceAttendeesQuery(raceId, distanceId);
            var result = await Mediator.Send(query, ct);

            return HandleResult(result);
        }

        //Attend
        [HttpPost("{raceId}/{distanceId}/attend")]
        public async Task<IActionResult> Attend([FromRoute] int raceId, [FromRoute] int distanceId, CancellationToken ct)
        {
            var command = new UpdateAttendeeCommand(raceId, distanceId);
            var result = await Mediator.Send(command,ct);
            return HandleResult(result);
        }

        [HttpPost("{raceId}/{distanceId}/attendWithPayment")]
        public async Task<IActionResult> AttendWithPayment(int raceId, int distanceId, [FromBody] StripePaymentDto paymentDto)
        {
            if (paymentDto == null)
            {
                _logger.LogError("Payment details are missing in the request.");
                return BadRequest("Payment details are required.");
            }

            if (string.IsNullOrWhiteSpace(paymentDto.StripeToken))
            {
                _logger.LogError("Stripe token is missing in the payment details.");
                return BadRequest("Stripe token is required.");
            }

            if (paymentDto.Amount <= 0)
            {
                _logger.LogError("Invalid payment amount: {Amount}", paymentDto.Amount);
                return BadRequest("Amount must be greater than zero.");
            }

            var command = new UpdateAttendeePaymentCommand(raceId, distanceId, paymentDto.StripeToken, paymentDto.Amount);
            var result = await Mediator.Send(command);

            if (result.IsSuccess)
            {
                _logger.LogInformation("Registration and payment for race {RaceId}, distance {DistanceId} successful.", raceId, distanceId);
                return Ok("Registration and payment successful.");
            }
            else
            {
                _logger.LogError("Failed to process registration and payment: {Error}", result.Error);
                return BadRequest(result.Error);
            }
        }

    }
}
