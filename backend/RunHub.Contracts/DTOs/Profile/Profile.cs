using RunHub.Domain.Entities;

namespace RunHub.Contracts.DTOs.Profile
{
    public class Profile
    {
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Club {  get; set; }
        public int DateOfBirth {  get; set; }
        public string Bio { get; set; }
        public string Image { get; set; }
        public Photo Photo { get; set; }
    }
}
