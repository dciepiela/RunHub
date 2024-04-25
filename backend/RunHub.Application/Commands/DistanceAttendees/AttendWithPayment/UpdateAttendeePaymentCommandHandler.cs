using MediatR;
using Microsoft.EntityFrameworkCore;
using RunHub.Application.Interfaces;
using RunHub.Contracts.Errors;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Commands.DistanceAttendees.AttendWithPayment
{
    public class UpdateAttendeePaymentCommandHandler : IRequestHandler<UpdateAttendeePaymentCommand, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        private readonly IStripeService _stripeService;

        public UpdateAttendeePaymentCommandHandler(DataContext context, IUserAccessor userAccessor, IStripeService stripeService)
        {
            _context = context;
            _userAccessor = userAccessor;
            _stripeService = stripeService;
        }

        public async Task<Result<Unit>> Handle(UpdateAttendeePaymentCommand request, CancellationToken cancellationToken)
        {
            var race = await _context.Races
                           .Include(r => r.Distances)
                               .ThenInclude(d => d.DistanceAttendees)
                                   .ThenInclude(da => da.Participator)
                           .FirstOrDefaultAsync(x => x.RaceId == request.RaceId, cancellationToken);

            if (race == null) return Result<Unit>.Failure("Race not found.");

            var distance = race.Distances.FirstOrDefault(d => d.DistanceId == request.DistanceId);
            if (distance == null) return Result<Unit>.Failure("Distance not found.");

            if (distance.AvailableSlots <= 0) return Result<Unit>.Failure("No available slots.");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername(), cancellationToken);
            if (user == null) return Result<Unit>.Failure("User not found.");

            var distanceAttendee = distance.DistanceAttendees.FirstOrDefault(da => da.Participator.UserName == user.UserName);
            if (distanceAttendee != null)
            {
                return Result<Unit>.Failure("User already registered.");
            }

            //// Create or update the customer and get the customer ID
            ////string customerId = await _stripeService.CreateOrUpdateCustomerAsync(request.StripeToken, user.Email, user.FirstName, user.LastName);

            //// Process payment
            //bool paymentSuccessful = await _stripeService.ProcessPaymentAsync(request.StripeToken, distance.Price, user.Email, user.FirstName, user.LastName);
            //if (!paymentSuccessful)
            //{
            //    return Result<Unit>.Failure("Payment failed.");
            //}

            // Create or update the customer and get the customer ID
            string customerId = await _stripeService.CreateOrUpdateCustomerAsync(request.StripeToken, user.Email, user.FirstName, user.LastName);
            if (string.IsNullOrEmpty(customerId))
            {
                return Result<Unit>.Failure("Failed to create or update Stripe customer.");
            }

            // Charge the customer
            var chargeResult = await _stripeService.ChargeCustomerAsync(customerId, distance.Price, "Payment for " + distance.Name);
            if (!chargeResult)
            {
                return Result<Unit>.Failure("Failed to charge the customer.");
            }

            // Automatically set Time if not provided
            DateTime currentTime = DateTime.UtcNow;

            distanceAttendee = new DistanceAttendee
            {
                Participator = user,
                Distance = distance,
                IsPaid = true,
                Price = distance.Price,
                PaidDate = currentTime
            };

            // Create a Result object
            var score = new Result
            {
                User = user,
                Distance = distance,
                Gender = user.Gender
                //Time = null, // Set Time
                //Place = 0, // You may need to set the place based on some logic
            };

            // Add result to context
            _context.Results.Add(score);



            distance.DistanceAttendees.Add(distanceAttendee);
            distance.AvailableSlots--;

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;
            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to register.");
        }
    }
}
