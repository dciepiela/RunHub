using RunHub.Domain.Entity.Enum;

namespace RunHub.Domain.Entity
{
    public class Race
    {
        public int RaceId { get; set; }
        public string Name { get; set; }
        public DateTime CreationDate { get; set; } = DateTime.UtcNow;
        public DateTime RegistrationEndDate { get; set; }
        public DateTime StartDateRace { get; set; }
        public DateTime EndDateRace { get; set; }
        public string Image { get; set; }
        public RaceStatus RaceStatus { get; set; }
        public RaceType RaceType { get; set; }

        //relation
        public string CreatorAppUserId { get; set; }
        public AppUser CreatorAppUser { get; set; }
        public int AddressId {  get; set; }
        public Address Address { get; set; }

        public ICollection<Distance> Distances { get; set; } = new List<Distance>();
        public ICollection<Sponsor> Sponsors { get; set; } = new List<Sponsor>();
        public ICollection<RaceAgeGroup> RaceAgeGroups { get; set; } = new List<RaceAgeGroup>();
    }
}
