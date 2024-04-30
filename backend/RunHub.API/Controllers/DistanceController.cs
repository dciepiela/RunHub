using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RunHub.Application.Commands.DistanceAttendees.AttendManually;
using RunHub.Application.Commands.DistanceAttendees.AttendWithPayment;
using RunHub.Application.Commands.Distances.CreateDistance;
using RunHub.Application.Commands.Distances.DeleteDistance;
using RunHub.Application.Commands.Distances.DisplayDistanceResult;
using RunHub.Application.Commands.Distances.GenerateDistanceIncomeReport;
using RunHub.Application.Commands.Distances.UpdateDistance;
using RunHub.Application.Queries.Attendance;
using RunHub.Application.Queries.Distances.GetAllDistances;
using RunHub.Application.Queries.Distances.GetDistanceById;
using RunHub.Application.Queries.Distances.GetDistances;
using RunHub.Contracts.DTOs.Distance;
using RunHub.Contracts.DTOs.DistanceAttendee.Manually;
using RunHub.Contracts.DTOs.Payments;

namespace RunHub.API.Controllers
{
    [Route("api/distances")]
    public class DistanceController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAllDistances(CancellationToken ct)
        {
            var distances = await Mediator.Send(new GetAllDistancesQuery(), ct);
            return HandleResult(distances);
        }

        [AllowAnonymous]
        [HttpGet("{raceId}")]
        public async Task<IActionResult> GetDistancesForRace(int raceId, CancellationToken ct)
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

        [Authorize(Policy = "IsRaceCreator")]
        [HttpPut("{raceId}/{distanceId}")]
        public async Task<IActionResult> EditDistance(int raceId, int distanceId, UpdateDistanceDto distanceDto, CancellationToken ct)
        {
            distanceDto.DistanceId = distanceId;
            var updateCommand = new UpdateDistanceCommand(raceId, distanceDto);
                
            var result = await Mediator.Send(updateCommand, ct);

            return HandleResult(result);
        }

        [Authorize(Policy = "IsRaceCreator")]
        [HttpDelete("{raceId}/{distanceId}")]
        public async Task<IActionResult> DeleteDistance([FromRoute] int raceId,[FromRoute] int distanceId, CancellationToken ct)
        {
            var command = new DeleteDistanceCommand(raceId,distanceId);
            var result = await Mediator.Send(command, ct);
            return HandleResult(result);
        }

        [AllowAnonymous]
        [HttpGet("{raceId}/{distanceId}/attendees")]
        public async Task<IActionResult> GetDistanceAttendees(int raceId, int distanceId, CancellationToken ct)
        {
            var query = new GetDistanceAttendeesQuery(raceId, distanceId);
            var result = await Mediator.Send(query, ct);

            return HandleResult(result);
        }

        [HttpPost("{raceId}/{distanceId}/attendWithPayment")]
        public async Task<IActionResult> AttendWithPayment(int raceId, int distanceId, [FromBody] StripePaymentDto paymentDto)
        {
            if (paymentDto == null)
            {
                return BadRequest("Szczegóły płatności są wymagane.");
            }

            if (string.IsNullOrWhiteSpace(paymentDto.StripeToken))
            {
                return BadRequest("Stripe token jest wymagany.");
            }

            if (paymentDto.Amount <= 0)
            {
                return BadRequest("Kwota musi być większa od 0.");
            }

            var command = new UpdateAttendeePaymentCommand(raceId, distanceId, paymentDto.StripeToken, paymentDto.Amount);
            var result = await Mediator.Send(command);
            return HandleResult(result);

        }

        [Authorize(Policy = "IsRaceCreator")]
        [HttpPost("{raceId}/{distanceId}/attendManually")]
        public async Task<IActionResult> ManualRegistration(int raceId, int distanceId, ManualRegistrationDto registrationDto)
        {
            var command = new UpdateAttendeeManullyCommand(raceId, distanceId, registrationDto);
            var result = await Mediator.Send(command);

            return HandleResult(result);
        }

        [HttpPut("{distanceId}/show")]
        public async Task<IActionResult> ToggleIsReadyToShow(int distanceId, UpdateIsReadyToShowDto showDto, CancellationToken ct)
        {
            var command = new UpdateIsReadyToShowCommand(distanceId, showDto.IsReadyToShow);
            var result = await Mediator.Send(command, ct);
            return HandleResult(result);
        }

        //generateReportIncome
        [HttpPost("{distanceId}/generateReportIncome")]
        public async Task<IActionResult> GenerateDistanceIncomeReport(int distanceId, CancellationToken ct)
        {
            var command = new GenerateDistanceIncomeReportCommand(distanceId);
            var result = await Mediator.Send(command, ct);
            return HandleResult(result);
        }

    }
}
