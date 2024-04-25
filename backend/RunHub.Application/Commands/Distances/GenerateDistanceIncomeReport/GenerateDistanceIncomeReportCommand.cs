using MediatR;
using RunHub.Contracts.DTOs.Distance.Report;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Commands.Distances.GenerateDistanceIncomeReport
{
    public record GenerateDistanceIncomeReportCommand(int DistanceId) : IRequest<Result<DistanceIncomeReportDto>>;
}
