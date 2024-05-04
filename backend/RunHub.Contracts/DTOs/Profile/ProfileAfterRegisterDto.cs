using RunHub.Domain.Entities;

namespace RunHub.Contracts.DTOs.Profile
{
    public class ProfileAfterRegisterDto
    {
        public string Club { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string PostalCode { get; set; }
    }
}
