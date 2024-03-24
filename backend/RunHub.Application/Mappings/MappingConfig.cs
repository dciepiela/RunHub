using Mapster;
using RunHub.Contracts.DTOs;
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
                .Map(dest => dest.AddressDto, src => src.Address.Adapt<AddressDto>())
                .Map(dest => dest.AddressId, src => src.Address.AddressId);

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

            TypeAdapterConfig<List<Race>, GetRacesResponse>
                .NewConfig()
                .Map(dest => dest.RaceDtos, src => src);

            TypeAdapterConfig<Race, GetRaceByIdResponse>
                .NewConfig()
                .Map(dest => dest.RaceDto, src => src)
                .Map(dest => dest.RaceDto.AddressDto, src => src.Address)
                .Map(dest => dest.RaceDto.Distances, src => src.Distances.Adapt<List<DistanceDto>>())           
                .Map(dest => dest.RaceDto.Sponsors, src => src.Sponsors.Adapt<List<SponsorDto>>());

            //.Map(dest => dest.RaceDto.Address, src => $"{src.Address.Street} {src.Address.PostalCode}-{src.Address.City}");

            //distance
            TypeAdapterConfig<List<Distance>, GetDistancesResponse>
                .NewConfig()
                .Map(dest => dest.DistanceDtos, src => src);

            TypeAdapterConfig<Distance, GetDistanceByIdResponse>
                .NewConfig()
                .Map(dest => dest.DistanceDto, src => src);


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

        }
    }
}
