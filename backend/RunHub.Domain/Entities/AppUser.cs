using Microsoft.AspNetCore.Identity;
using RunHub.Domain.Entities;

namespace RunHub.Domain.Entity
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Nationality { get; set; }
        public string Gender { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Bio { get; set; }
        public string ContactNumber { get; set; }
        public string Club { get; set; }
        
        //photo
        public Photo Photo { get; set; }

        //relation
        public Address Address { get; set; }
        public ICollection<DistanceAttendee> Distances { get; set; }
    }
}
