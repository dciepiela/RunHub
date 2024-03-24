using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RunHub.API.Extensions;
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
using RunHub.Contracts.Requests;
using RunHub.Contracts.Requests.Address;
using RunHub.Contracts.Requests.Races;
using RunHub.Contracts.Requests.Sponsors;

namespace RunHub.API.Controllers
{
    [AllowAnonymous]
    [Route("api/races")]
    public class RaceController:BaseApiController
    {
        [HttpGet]
        public async Task<IResult> GetRaces([FromQuery] int pageSize, [FromQuery] int pageNumber, 
            [FromQuery] string Name, [FromQuery] string SortBy, [FromQuery] bool IsDescending, CancellationToken ct)
        {
            var paginationParams = new PaginationParams { PageNumber = pageNumber, PageSize = pageSize };

            var races = await Mediator.Send(new GetRacesQuery(paginationParams,Name,SortBy, IsDescending),ct);

            return Results.Extensions.OkPaginationResult(races.PageSize, races.CurrentPage, races.TotalCount, races.TotalPages, races.Items);
        }

        [HttpGet("{raceId}")] //api/races/fdfdfdfdf
        public async Task<IActionResult> GetRaceById(int raceId, CancellationToken ct)
        {
            var race = await Mediator.Send(new GetRaceByIdQuery(raceId));
            return Ok(race);
        }

        //[Authorize(Roles = "Organizer")]
        [HttpPost]
        public async Task<IActionResult> CreateRace(CreateRaceRequest createUserRequest,CancellationToken ct)
        {
            var command = new CreateRaceCommand(createUserRequest.Name, createUserRequest.Description,
               createUserRequest.RegistrationEndDate, createUserRequest.StartDateRace, createUserRequest.EndDateRace, createUserRequest.Image,
               createUserRequest.RaceStatus, createUserRequest.RaceType,createUserRequest.AddressDto);
            
            var result = await Mediator.Send(command, ct);

            return Ok(result);
        }

        [HttpPut("{raceId}")]
        public async Task<IActionResult> EditRace(int raceId, UpdateRaceRequest updateRaceRequest, CancellationToken ct)
        {
            var command = new UpdateRaceCommand(raceId, updateRaceRequest.Name, updateRaceRequest.Description,
                updateRaceRequest.RegistrationEndDate, updateRaceRequest.StartDateRace,
                updateRaceRequest.EndDateRace, updateRaceRequest.Image, updateRaceRequest.RaceStatus,
                updateRaceRequest.RaceType, updateRaceRequest.AddressDto);

            var result = await Mediator.Send(command, ct);
            return Ok(result);
        }

        [HttpDelete("{raceId}")]
        public async Task<IActionResult> DeleteRace(int raceId, CancellationToken ct)
        {
            var command = new DeleteRaceCommand(raceId);
            var result = await Mediator.Send(command, ct);
            return Ok(result);
        }

        // Address
        [HttpGet("{raceId}/address")]
        public async Task<IActionResult> GetAddressForRace(int raceId, CancellationToken ct)
        {
            var address = await Mediator.Send(new GetAddressByIdQuery(raceId), ct);
            return Ok(address);
        }

        [HttpPut("{raceId}/address")]
        public async Task<IActionResult> EditAddress(int raceId, UpdateAddressRequest updateAddressRequest, CancellationToken ct)
        {
            var command = new UpdateAddressCommand(raceId, updateAddressRequest.City, updateAddressRequest.Street,
                updateAddressRequest.Country, updateAddressRequest.PostalCode);

            var result = await Mediator.Send(command, ct);

            return Ok(result);
        }


        // Sponsor
        [HttpGet("{raceId}/sponsors")]
        public async Task<IActionResult> GetSponsors(int raceId, CancellationToken ct)
        {
            var sponsors = await Mediator.Send(new GetSponsorsQuery(raceId), ct);
            return Ok(sponsors);
        }

        [HttpGet("{raceId}/sponsors/{sponsorId}")]
        public async Task<IActionResult> GetSponsors(int raceId, int sponsorId, CancellationToken ct)
        {
            var sponsor = await Mediator.Send(new GetSponsorByIdQuery(raceId, sponsorId), ct);
            return Ok(sponsor);
        }

        [HttpPost("{raceId}/sponsor")]
        public async Task<IActionResult> CreateSponsor(int raceId, CreateSponsorRequest createSponsorRequest, CancellationToken ct)
        {
            var command = new CreateSponsorCommand(raceId, createSponsorRequest.Name, createSponsorRequest.Logo,
                createSponsorRequest.Description, createSponsorRequest.WebPageUrl, createSponsorRequest.Amount,
                createSponsorRequest.SupportType);

            var result = await Mediator.Send(command, ct);

            return Ok(result);
        }
    }
}
