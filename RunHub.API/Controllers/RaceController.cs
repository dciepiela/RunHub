using Microsoft.AspNetCore.Mvc;
using RunHub.Application.Commands.Races.CreateRace;
using RunHub.Application.Commands.Races.DeleteRace;
using RunHub.Application.Commands.Races.UpdateRace;
using RunHub.Application.Queries.Races.GetRaceById;
using RunHub.Application.Queries.Races.GetRaces;
using RunHub.Contracts.Requests;
using System.Diagnostics;

namespace RunHub.API.Controllers
{
    public class RaceController:BaseApiController
    {
        [HttpGet("GetRaces")]
        public async Task<IActionResult> GetRaces(CancellationToken ct)
        {
            var races = await Mediator.Send(new GetRacesQuery(),ct);
            return Ok(races);
        }

        [HttpGet("GetRaceById/{id}")] //api/races/fdfdfdfdf
        public async Task<IActionResult> GetRaceById(int id, CancellationToken ct)
        {
            var race = await Mediator.Send(new GetRaceByIdQuery(id));
            return Ok(race);
        }

        [HttpPost("CreateRace")]
        public async Task<IActionResult> CreateRace(CreateRaceRequest createRaceRequest,CancellationToken ct)
        {
            var command = new CreateRaceCommand(createRaceRequest.Name, createRaceRequest.Description,createRaceRequest.RegistrationEndDate, 
                createRaceRequest.StartDateRace,createRaceRequest.EndDateRace, 
                createRaceRequest.Image, createRaceRequest.RaceStatus,
                createRaceRequest.RaceType, createRaceRequest.CreatorAppUserId,
                createRaceRequest.Address);

            var result = await Mediator.Send(command, ct);
            return Ok(result);
        }

        [HttpPut("EditRace/{id}")]
        public async Task<IActionResult> EditRace(int id, UpdateRaceRequest updateRaceRequest, CancellationToken ct)
        {
            var command = new UpdateRaceCommand(id, updateRaceRequest.Name, updateRaceRequest.Description,
                updateRaceRequest.RegistrationEndDate,
                updateRaceRequest.StartDateRace, updateRaceRequest.EndDateRace,
                updateRaceRequest.Image, updateRaceRequest.RaceStatus,
                updateRaceRequest.RaceType,
                updateRaceRequest.Address);

            var result = await Mediator.Send(command, ct);
            return Ok(result);
        }

        [HttpDelete("DeleteRace/{id}")]
        public async Task<IActionResult> DeleteRace(int id, CancellationToken ct)
        {
            var command = new DeleteRaceCommand(id);
            var result = await Mediator.Send(command, ct);
            return Ok(result);
        }

    }
}
