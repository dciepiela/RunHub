using MediatR;
using Microsoft.AspNetCore.Http;
using RunHub.Contracts.Errors;
using RunHub.Domain.Entities;

namespace RunHub.Application.Commands.Races.AddRacePhoto
{
    public class AddRacePhotoCommand : IRequest<Result<Photo>>
    {
        public int? RaceId { get; set; }
        public IFormFile File { get; set; }
    }
}
