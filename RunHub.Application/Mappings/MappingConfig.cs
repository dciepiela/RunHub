using Mapster;
using RunHub.Contracts.DTOs;
using RunHub.Contracts.Responses;
using RunHub.Domain.Entity;

namespace RunHub.Application.Mappings
{
    public class MappingConfig
    {
        public static void Configure()
        {
            //TypeAdapterConfig<Race, RaceDto>
            //    .NewConfig()
            //    .Map(dest => dest.Last, src => src.LastUpdateDate);

            TypeAdapterConfig<List<Race>, GetRacesResponse>
                .NewConfig()
                .Map(dest => dest.RaceDtos, src => src);


            TypeAdapterConfig<Race, GetRaceByIdResponse>
                .NewConfig()
                .Map(dest => dest.RaceDto, src => src);
                //.Map(dest => dest.RaceDto.Address, src => $"{src.Address.Street} {src.Address.PostalCode}-{src.Address.City}");
        }
    }
}
