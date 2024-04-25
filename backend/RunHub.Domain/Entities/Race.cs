using RunHub.Domain.Entities;
using RunHub.Domain.Enum;

namespace RunHub.Domain.Entity
{
    public class Race
    {
        public int RaceId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; } = DateTime.UtcNow;
        public DateTime LastUpdateDate { get; set; } = DateTime.UtcNow;
        public DateTime? RegistrationEndDate { get; set; }
        public DateTime? StartDateRace { get; set; }
        public DateTime? EndDateRace { get; set; }
        public RaceStatus RaceStatus { get; set; }
        public RaceType RaceType { get; set; }

        //relation
        public AppUser CreatorAppUser { get; set; }
        public Address Address { get; set; }

        //Photo
        public string PhotoId { get; set; }
        public Photo Photo { get; set; }


        public ICollection<Distance> Distances { get; set; } = new List<Distance>();
        public ICollection<Sponsor> Sponsors { get; set; } = new List<Sponsor>();
    }
}
