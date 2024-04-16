using MediatR;
using RunHub.Contracts.Errors;

namespace RunHub.Application.Commands.DistanceAttendees.AttendWithPayment
{
    public record UpdateAttendeePaymentCommand(int RaceId, int DistanceId, string StripeToken, decimal Amount) : IRequest<Result<Unit>> { }
}
