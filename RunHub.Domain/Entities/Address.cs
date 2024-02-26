namespace RunHub.Domain.Entity
{
    public class Address
    {
        public int AddressID { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }

        // Foreign Key
        public int? RaceId { get; set; }
        public Race Race { get; set; }

        public string? AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}
