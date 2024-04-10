namespace RunHub.Contracts.DTOs.Distance
{
    public class CreateDistanceDto
    {
        public string Name { get; set; }
        public double LengthInKilometers { get; set; }
        public string Description { get; set; }
        public int AvailableSlots { get; set; }
        public int TotalSlots { get; set; }
        public decimal Price { get; set; }
    }
}
