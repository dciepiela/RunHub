using Microsoft.AspNetCore.Identity;

namespace RunHub.Domain.Entity
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Nationality { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Bio { get; set; }
        public string ContactNumber { get; set; }
        public string Club { get; set; }

        //relation
        public int AddressId { get; set; }
        public Address Address { get; set; }
        public ICollection<DistanceAttendee> DistanceAttendees { get; set; }
    }
}
