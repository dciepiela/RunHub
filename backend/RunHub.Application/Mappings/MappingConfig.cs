using Mapster;
using RunHub.Contracts.DTOs;
using RunHub.Contracts.DTOs.Distance;
using RunHub.Contracts.DTOs.DistanceAttendee;
using RunHub.Contracts.DTOs.Profile;
using RunHub.Contracts.DTOs.Race;
using RunHub.Contracts.DTOs.Sponsor;
using RunHub.Contracts.Responses.Address;
using RunHub.Contracts.Responses.Distances;
using RunHub.Contracts.Responses.Races;
using RunHub.Contracts.Responses.Sponsors;
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
                .Map(dest => dest.AddressDto, src => src.Address.Adapt<AddressDto>())
                .Map(dest => dest.Distances, src => src.Distances.Adapt<List<DistanceDto>>())
                .Map(dest => dest.Sponsors, src => src.Sponsors.Adapt<List<SponsorDto>>());

            //.Map(dest => dest.AddressId, src => src.Address.AddressId);

            //TypeAdapterConfig<Race, RaceDto>
            //.NewConfig()
            //.Map(dest => dest.RaceId, src => src.RaceId)
            //.Map(dest => dest.Name, src => src.Name)
            //.Map(dest => dest.Description, src => src.Description)
            //.Map(dest => dest.CreationDate, src => src.CreationDate)
            //.Map(dest => dest.LastUpdateDate, src => src.LastUpdateDate)
            //.Map(dest => dest.RegistrationEndDate, src => src.RegistrationEndDate)
            //.Map(dest => dest.StartDateRace, src => src.StartDateRace)
            //.Map(dest => dest.EndDateRace, src => src.EndDateRace)
            //.Map(dest => dest.Image, src => src.Image)
            //.Map(dest => dest.RaceStatus, src => src.RaceStatus)
            //.Map(dest => dest.RaceType, src => src.RaceType)
            //.Map(dest => dest.CreatorAppUserId, src => src.CreatorAppUserId)
            //.Map(dest => dest.Address, src => src.Address.Adapt<AddressDto>())
            //.Map(dest => dest.Distances, src => src.Distances.Adapt<List<DistanceDto>>());

            //TypeAdapterConfig<List<Race>, GetRacesResponse>
            //    .NewConfig()
            //    .Map(dest => dest.RaceDtos, src => src);

            //TypeAdapterConfig<Race, GetRaceByIdResponse>
            //    .NewConfig()
            //    .Map(dest => dest.RaceDto, src => src)
            //    .Map(dest => dest.RaceDto.HostUsername, src => src.CreatorAppUser.UserName)
            //    .Map(dest => dest.RaceDto.AddressDto, src => src.Address)
            //    .Map(dest => dest.RaceDto.Distances, src => src.Distances.Adapt<List<DistanceDto>>())           
            //    .Map(dest => dest.RaceDto.Sponsors, src => src.Sponsors.Adapt<List<SponsorDto>>());


            //.Map(dest => dest.RaceDto.Address, src => $"{src.Address.Street} {src.Address.PostalCode}-{src.Address.City}");

            //distance
            TypeAdapterConfig<Distance, DistanceDto>
                .NewConfig()
                .Map(dest => dest.DistanceAttendees, src => src.DistanceAttendees.Adapt<List<DistanceAttendeeDto>>());

            TypeAdapterConfig<List<Distance>, GetDistancesResponse>
                .NewConfig()
                .Map(dest => dest.DistanceDtos, src => src);

            //TypeAdapterConfig<Distance, DistanceDto>
            //.NewConfig()
            //.Map(dest => dest.Attendees, src => src.DistanceAttendees.Select(da => da.Participator.Adapt<ProfileDto>()).ToList());


            TypeAdapterConfig<Distance, GetDistanceByIdResponse>
                .NewConfig()
                .Map(dest => dest.DistanceDto, src => src);

            TypeAdapterConfig<Distance, UpdateDistanceDto>
                .NewConfig()
                .Map(dest => dest, src => src);
            // Address
            TypeAdapterConfig<Address, GetAddressByIdResponse>
                .NewConfig()
                .Map(dest => dest.AddressDto, src => src);
            //TypeAdapterConfig<Address, AddressDto>
            //    .NewConfig()
            //    .Map(dest => dest, src=> src);


            // Sponsor
            TypeAdapterConfig<List<Sponsor>, GetSponsorsResponse>
                .NewConfig()
                .Map(dest => dest.SponsorDtos, src => src.Adapt<List<SponsorDto>>());

            TypeAdapterConfig<Sponsor, GetSponsorByIdResponse>
                .NewConfig()
                .Map(dest => dest.SponsorDto, src => src);


            //Profile
            //TypeAdapterConfig<DistanceAttendee, ProfileDto>
            //    .NewConfig()
            //    .Map(dest => dest.Username, src => src.Participator.UserName)
            //    .Map(dest => dest.FullName, src => $"{src.Participator.FirstName} {src.Participator.LastName}")
            //    .Map(dest => dest.Bio, src => src.Participator.Bio);
            //.Ignore(dest => dest.Image); // Assuming Image property is not mapped


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
            //.Map(dest => dest.Bio, src => src.Participator.Bio);
            //.Map(dest => dest.ParticipatorId, src => src.ParticipatorId)
            //.Map(dest => dest.UserName, src => src.Participator.UserName)
            //.Map(dest => dest.ParticipatorFirstName, src => src.Participator.FirstName)
            //.Map(dest => dest.ParticipatorLastName, src => src.Participator.LastName)
            //.Map(dest => dest.IsPaid, src => src.IsPaid)
            //.Map(dest => dest.PaidDate, src => src.PaidDate)
            //.Map(dest => dest.Price, src => src.Price);

            //.Ignore(dest => dest.Image); // Assuming Image property is not mapped

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
              .Map(dest => dest.Image, src => src.Photo.Url);


            //attendee
            //TypeAdapterConfig<AppUser, DistanceAttendeeDto>
            //    .NewConfig()
            //    .Map(dest => dest.UserName, src => src.UserName)
            //    .Map(dest => dest.DisplayName, src => src.DisplayName)
            //    .Map(dest => dest.FirstName, src => src.FirstName)
            //    .Map(dest => dest.LastName, src => src.LastName)
            //    .Map(dest => dest.Gender, src => src.Gender)
            //    .Map(dest => dest.Club, src => src.Club)
            //    .Map(dest => dest.DateOfBirth, src => src.DateOfBirth.Year) // Assuming you want to map only the year of birth
            //    .Map(dest => dest.Image, src => src.Photo.Url);


            //UserDistanceDto
            TypeAdapterConfig<DistanceAttendee, UserDistanceDto>
            .NewConfig()
            .Map(dest => dest.DistanceId, src => src.DistanceId)
            .Map(dest => dest.RaceId, src => src.Distance.RaceId)
            .Map(dest => dest.Image, src => src.Distance.Race.Image)
            .Map(dest => dest.Name, src => src.Distance.Name)
            .Map(dest => dest.Date, src => src.Distance.Race.StartDateRace)
            .Map(dest => dest.RaceType, src => src.Distance.Race.RaceType)
            .Map(dest => dest.HostUsername, src => src.Distance.Race.CreatorAppUser.UserName);


        }
    }
}
