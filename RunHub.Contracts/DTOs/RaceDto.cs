using RunHub.Domain.Entity;
using RunHub.Domain.Enum;

namespace RunHub.Contracts.DTOs
{
    public record RaceDto(
        int RaceId,
        string Name, 
        string Description, 
        DateTime CreationDate, 
        DateTime LastUpdateDate, 
        DateTime RegistrationEndDate,
        DateTime StartDateRace,
        DateTime EndDateRace,
        string Image,
        RaceStatus RaceStatus,
        RaceType RaceType,
        string CreatorAppUserId,
        AddressDto Address
        );
}
