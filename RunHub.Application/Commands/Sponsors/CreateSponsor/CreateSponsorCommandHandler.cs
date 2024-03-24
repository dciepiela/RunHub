using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Exceptions;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Sponsors.CreateSponsor
{
    public class CreateSponsorCommandHandler : IRequestHandler<CreateSponsorCommand, int>
    {
        private readonly DataContext _context;

        public CreateSponsorCommandHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<int> Handle(CreateSponsorCommand request, CancellationToken cancellationToken)
        {
            var race = await _context.Races.FirstOrDefaultAsync(x => x.RaceId == request.RaceId,cancellationToken);

            if(race == null)
            {
                throw new NotFoundException($"{nameof(Race)} z {nameof(Race.RaceId)}: {request.RaceId}" + " nie został znaleziony w bazie danych");
            }

            var sponsor = new Sponsor
            {
                RaceId = request.RaceId,
                Name = request.Name,
                Logo = request.Logo,
                Description = request.Description,
                WebPageUrl = request.WebPageUrl,
                Amount = request.Amount,
                SupportType = request.SupportType
            };

            await _context.Sponsors.AddAsync(sponsor, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return sponsor.RaceId;
        }
    }
}
