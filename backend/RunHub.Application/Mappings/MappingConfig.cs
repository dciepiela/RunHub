using Mapster;
using RunHub.Contracts.DTOs;
using RunHub.Contracts.DTOs.Comment;
using RunHub.Contracts.DTOs.Distance;
using RunHub.Contracts.DTOs.Distance.Report;
using RunHub.Contracts.DTOs.DistanceAttendee;
using RunHub.Contracts.DTOs.DistanceAttendee.Manually;
using RunHub.Contracts.DTOs.Profile;
using RunHub.Contracts.DTOs.Race;
using RunHub.Contracts.DTOs.Result;
using RunHub.Contracts.DTOs.Sponsor;
using RunHub.Contracts.DTOs.UserDtos;
using RunHub.Domain.Entities;
using RunHub.Domain.Entity;

namespace RunHub.Application.Mappings
{
    public class MappingConfig
    {
        public static void Configure()
        {
            TypeAdapterConfig<Race, RaceDto>
                .NewConfig()
                .Map(dest => dest.HostUsername, src => src.CreatorAppUser.UserName)
                .Map(dest => dest.Photo, src => src.Photo)
                .Map(dest => dest.AddressDto, src => src.Address.Adapt<AddressDto>())
                .Map(dest => dest.Distances, src => src.Distances.Adapt<List<DistanceDto>>())
                .Map(dest => dest.Sponsors, src => src.Sponsors.Adapt<List<SponsorDto>>());

            //distance
            TypeAdapterConfig<Distance, DistanceDto>
                .NewConfig()
                .Map(dest => dest.HostUsername, src => src.Race.CreatorAppUser.UserName)
                .Map(dest => dest.RegisteredUser, src => src.DistanceAttendees.Count)
                .Map(dest => dest.IsReadyToShow, src => src.IsReadyToShow)
                .Map(dest => dest.Date, src => src.Race.StartDateRace)
                .Map(dest => dest.DistanceAttendees, src => src.DistanceAttendees.Adapt<List<DistanceAttendeeDto>>())
                .Map(dest => dest.Results, src => src.Results.Adapt<List<ResultDto>>());

            TypeAdapterConfig<Distance, UpdateIsReadyToShowDto>
                .NewConfig()
                .Map(dest => dest.IsReadyToShow, src => src.IsReadyToShow);

            //attendee
            TypeAdapterConfig<DistanceAttendee, DistanceAttendeeDto>
                .NewConfig()
                .Map(dest => dest.UserName, src => src.Participator.UserName)
                .Map(dest => dest.DisplayName, src => src.Participator.DisplayName)
                .Map(dest => dest.FirstName, src => src.Participator.FirstName)
                .Map(dest => dest.LastName, src => src.Participator.LastName)
                .Map(dest => dest.DateOfBirth, src => src.Participator.DateOfBirth.Year) // Mapowanie na rok urodzenia
                .Map(dest => dest.Gender, src => src.Participator.Gender)
                .Map(dest => dest.Club, src => src.Participator.Club)
                .Map(dest => dest.Image, src => src.Participator.Photo.Url);

            //profiles
            TypeAdapterConfig<AppUser, Profile>
              .NewConfig()
              .Map(dest => dest.UserName, src => src.UserName)
              .Map(dest => dest.DisplayName, src => src.DisplayName)
              .Map(dest => dest.FirstName, src => src.FirstName)
              .Map(dest => dest.LastName, src => src.LastName)
              .Map(dest => dest.DateOfBirth, src => src.DateOfBirth.Year)
              .Map(dest => dest.Club, src => src.Club)
              .Map(dest => dest.Bio, src => src.Bio)
              .Map(dest => dest.Image, src => src.Photo.Url)
              .Map(dest => dest.City, src => src.Address.City)
              .Map(dest => dest.PostalCode, src => src.Address.PostalCode)
              .Map(dest => dest.Street, src => src.Address.Street);


            //UserDistanceDto
            TypeAdapterConfig<DistanceAttendee, UserDistanceDto>
            .NewConfig()
            .Map(dest => dest.DistanceId, src => src.DistanceId)
            .Map(dest => dest.RaceId, src => src.Distance.RaceId)
            .Map(dest => dest.Name, src => src.Distance.Name)
            .Map(dest => dest.Date, src => src.Distance.Race.StartDateRace)
            .Map(dest => dest.RaceType, src => src.Distance.Race.RaceType)
            .Map(dest => dest.HostUsername, src => src.Distance.Race.CreatorAppUser.UserName);


            //ManuallyRegistration
            TypeAdapterConfig<ManualRegistrationDto,AppUser>
                .NewConfig()
                .Map(dest => dest.FirstName, src => src.FirstName)
                .Map(dest => dest.LastName, src => src.LastName)
                .Map(dest => dest.Club, src => src.Club)
                .Map(dest => dest.DateOfBirth, src => src.DateOfBirth)
                .Map(dest => dest.Gender, src => src.Gender);

            //result
            TypeAdapterConfig<Result, ResultDto>
                .NewConfig()
                .Map(dest => dest.ResultId, src => src.ResultId)
                .Map(dest => dest.UserId, src => src.UserId)
                .Map(dest => dest.DistanceId, src => src.DistanceId)
                .Map(dest => dest.Time, src => src.Time)
                .Map(dest => dest.Place, src => src.Place)
                .Map(dest => dest.PlaceGender, src => src.PlaceGender)
                .Map(dest => dest.FirstName, src => src.User.FirstName)
                .Map(dest => dest.LastName, src => src.User.LastName)
                .Map(dest => dest.Club, src => src.User.Club)
                .Map(dest => dest.Gender, src => src.User.Gender);


            //DistanceIncome
            TypeAdapterConfig<DistanceAttendee, DistanceAttendeeForReportDto>
               .NewConfig()
               .Map(dest => dest.FirstName, src => src.Participator.FirstName)
               .Map(dest => dest.LastName, src => src.Participator.LastName)
               .Map(dest => dest.DateOfBirth, src => src.Participator.DateOfBirth)
               .Map(dest => dest.Club, src => src.Participator.Club)
               .Map(dest => dest.Gender, src => src.Participator.Gender);


            TypeAdapterConfig<Distance, DistanceIncomeReportDto>
                .NewConfig()
                .Map(dest => dest.DistanceId, src => src.DistanceId)
                .Map(dest => dest.Name, src => src.Name)
                .Map(dest => dest.LengthInKilometers, src => src.LengthInKilometers)
                .Map(dest => dest.Price, src => src.Price)
                .Map(dest => dest.TotalAttendees, src => src.DistanceAttendees.Count)
                .Map(dest => dest.TotalIncome, src => src.Price * src.DistanceAttendees.Count)
                .Map(dest => dest.Attendees, src => src.DistanceAttendees.Adapt<List<DistanceAttendeeForReportDto>>());

            //Comment
            TypeAdapterConfig<Comment, CommentDto>
                .NewConfig()
                .Map(dest => dest.Username, src => src.Author.UserName)
                .Map(dest => dest.DisplayName, src => src.Author.DisplayName)
                .Map(dest => dest.Image, src => src.Author.Photo.Url);
        }
    }
}
