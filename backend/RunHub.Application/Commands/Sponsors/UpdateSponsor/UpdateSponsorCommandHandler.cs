using MediatR;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Sponsors.UpdateSponsor
{
    public class UpdateSponsorCommandHandler : IRequestHandler<UpdateSponsorCommand, Unit>
    {
        private readonly DataContext _context;

        public UpdateSponsorCommandHandler(DataContext context)
        {
            _context = context;
        }
        public Task<Unit> Handle(UpdateSponsorCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
