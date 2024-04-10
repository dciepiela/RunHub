using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RunHub.Application.Commands.Addresses.UpdateAddress;
using RunHub.Application.Commands.Races.CreateRace;
using RunHub.Application.Commands.Races.DeleteRace;
using RunHub.Application.Commands.Races.UpdateRace;
using RunHub.Application.Commands.Sponsors.CreateSponsor;
using RunHub.Application.Queries.Addresses.GetAddressById;
using RunHub.Application.Queries.Races.GetRaceById;
using RunHub.Application.Queries.Races.GetRaces;
using RunHub.Application.Queries.Sponsors.GetSponsorById;
using RunHub.Application.Queries.Sponsors.GetSponsors;
using RunHub.Contracts.DTOs;
using RunHub.Contracts.DTOs.Race;
using RunHub.Contracts.DTOs.Sponsor;
using RunHub.Contracts.Requests;

namespace RunHub.API.Controllers
{
    [Route("api/races")]
    public class RaceController:BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetRaces([FromQuery]PaginationParams paginationParams, string Name, 
            [FromQuery] string SortBy, [FromQuery] bool IsDescending, CancellationToken ct)
        {

            var races = await Mediator.Send(new GetRacesQuery(paginationParams, Name, SortBy, IsDescending), ct);

            return HandlePagedResult(races);
        }

        [AllowAnonymous]
        [HttpGet("{raceId}")] //api/races/fdfdfdfdf
        public async Task<IActionResult> GetRaceById(int raceId, CancellationToken ct)
        {
            var result = await Mediator.Send(new GetRaceByIdQuery(raceId));
            return HandleResult(result);
        }

        [Authorize(Roles = "Organizer")]
        [HttpPost]
        public async Task<IActionResult> CreateRace(CreateRaceDto raceDto,CancellationToken ct)
        {
            var command = new CreateRaceCommand(raceDto);
            
            var result = await Mediator.Send(command, ct);

            return HandleResult(result);
        }

        //[Authorize(Policy = "IsRaceCreator")]
        [HttpPut("{raceId}")]
        public async Task<IActionResult> EditRace(int raceId, UpdateRaceDto raceDto, CancellationToken ct)
        {
            raceDto.RaceId = raceId;
            var command = new UpdateRaceCommand(raceDto);

            var result = await Mediator.Send(command, ct);

            return HandleResult(result);
        }

        [Authorize(Policy = "IsRaceCreator")]
        [HttpDelete("{raceId}")]
        public async Task<IActionResult> DeleteRace(int raceId, CancellationToken ct)
        {
            var command = new DeleteRaceCommand(raceId);
            var result = await Mediator.Send(command, ct);
            return HandleResult(result);
        }

        // Address
        [AllowAnonymous]
        [HttpGet("{raceId}/address")]
        public async Task<IActionResult> GetAddressForRace(int raceId, CancellationToken ct)
        {
            var address = await Mediator.Send(new GetAddressByIdQuery(raceId), ct);
            return HandleResult(address);
        }

        [Authorize(Policy = "IsRaceCreator")]
        [HttpPut("{raceId}/address")]
        public async Task<IActionResult> EditAddress(int raceId, AddressDto address, CancellationToken ct)
        {
            var command = new UpdateAddressCommand(raceId, address);

            var result = await Mediator.Send(command, ct);

            return HandleResult(result);
        }


        // Sponsor
        [AllowAnonymous]
        [HttpGet("{raceId}/sponsors")]
        public async Task<IActionResult> GetSponsors(int raceId, CancellationToken ct)
        {
            var sponsors = await Mediator.Send(new GetSponsorsQuery(raceId), ct);
            return HandleResult(sponsors);
        }

        [AllowAnonymous]
        [HttpGet("{raceId}/sponsors/{sponsorId}")]
        public async Task<IActionResult> GetSponsorById(int raceId, int sponsorId, CancellationToken ct)
        {
            var sponsor = await Mediator.Send(new GetSponsorByIdQuery(raceId, sponsorId), ct);
            return HandleResult(sponsor);
        }

        [Authorize(Policy = "IsRaceCreator")]
        [HttpPost("{raceId}/sponsor")]
        public async Task<IActionResult> CreateSponsor(int raceId, CreateSponsorDto sponsorDto, CancellationToken ct)
        {
            var command = new CreateSponsorCommand(raceId, sponsorDto);

            var result = await Mediator.Send(command, ct);

            return HandleResult(result);
        }
    }
}
