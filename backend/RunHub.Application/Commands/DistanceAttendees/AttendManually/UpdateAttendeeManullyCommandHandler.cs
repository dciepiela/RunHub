﻿using Mapster;
using MediatR;
using RunHub.Contracts.Errors;
using RunHub.Domain.Entity;
using RunHub.Persistence;

namespace RunHub.Application.Commands.DistanceAttendees.AttendManually
{
    public class UpdateAttendeeManullyCommandHandler : IRequestHandler<UpdateAttendeeManullyCommand, Result<Unit>>
    {
        private readonly DataContext _context;

        public UpdateAttendeeManullyCommandHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<Unit>> Handle(UpdateAttendeeManullyCommand request, CancellationToken cancellationToken)
        {

            var registrationDto = request.RegistrationDto;

            var user = registrationDto.Adapt<AppUser>();

            // Sprawdzenie, czy wymagane pola są uzupełnione
            if (string.IsNullOrWhiteSpace(registrationDto.FirstName) || string.IsNullOrWhiteSpace(registrationDto.LastName))
            {
                return Result<Unit>.Failure("First name and last name are required for manual registration.");
            }
            
            _context.Users.Add(user);

            DateTime currentTime = DateTime.UtcNow;

            var distance = await _context.Distances.FindAsync(request.DistanceId);

            if (distance == null) return null;

            var distanceAttendee = new DistanceAttendee
            {
                Participator = user,
                DistanceId = request.DistanceId,
                PaidDate = currentTime,
                IsPaid = true,
                Price = distance.Price
            };

            var score = new Result
            {
                User = user,
                Distance = distance,
                Gender = user.Gender,
            };

            _context.Results.Add(score);

            distance.DistanceAttendees.Add(distanceAttendee);

            distance.AvailableSlots--;

            _context.DistanceAttendees.Add(distanceAttendee);

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem z ręcznym dodaniem zawodnika.");
        }
    }
}
