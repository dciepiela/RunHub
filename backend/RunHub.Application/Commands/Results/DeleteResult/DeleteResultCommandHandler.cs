using MediatR;
using RunHub.Contracts.Errors;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Results.DeleteResult
{
    public class DeleteResultCommandHandler : IRequestHandler<DeleteResultCommand, Result<Unit>>
    {
        private readonly DataContext _context;

        public DeleteResultCommandHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<Unit>> Handle(DeleteResultCommand request, CancellationToken cancellationToken)
        {
            var result = await _context.Results.FindAsync(request.ResultId);

            if (result == null) return null;

            _context.Results.Remove(result);

            var saveChangesResult = await _context.SaveChangesAsync(cancellationToken);

            if (saveChangesResult > 0)
                return Result<Unit>.Success(Unit.Value);
            else
                return Result<Unit>.Failure("Problem z usunięciem wyniku"); ;
        }
    }
}
