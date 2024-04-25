using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.DTOs.Distance;
using RunHub.Contracts.DTOs.Distance.Report;
using RunHub.Contracts.DTOs.DistanceAttendee;
using RunHub.Contracts.Errors;
using RunHub.Persistence;

namespace RunHub.Application.Commands.Distances.GenerateDistanceIncomeReport
{
    public class GenerateDistanceIncomeReportCommandHandler : IRequestHandler<GenerateDistanceIncomeReportCommand, Result<DistanceIncomeReportDto>>
    {
        private readonly DataContext _context;
        public GenerateDistanceIncomeReportCommandHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<DistanceIncomeReportDto>> Handle(GenerateDistanceIncomeReportCommand request, CancellationToken cancellationToken)
        {
            var distance = await _context.Distances
                .Include(d => d.DistanceAttendees)
                    .ThenInclude(da => da.Participator)
                .FirstOrDefaultAsync(d => d.DistanceId == request.DistanceId, cancellationToken);

            if (distance == null) return null;

            if (distance.DistanceAttendees.Count == 0)
                return Result<DistanceIncomeReportDto>.Failure($"Brak zapisanych użytkowników dla dystansu: {request.DistanceId}.");

            var reportDto = distance.Adapt<DistanceIncomeReportDto>();
            reportDto.TotalAttendees = distance.DistanceAttendees.Count;
            reportDto.TotalIncome = distance.Price * distance.DistanceAttendees.Count;
            reportDto.Attendees = distance.DistanceAttendees.Adapt<List<DistanceAttendeeForReportDto>>();

            return Result<DistanceIncomeReportDto>.Success(reportDto);
        }
    }
}
