namespace RunHub.Domain.Entity
{
    public class RaceAgeGroup
    {
        public int RaceId { get; set; }
        public Race Race { get; set; }

        public int AgeGroupId { get; set; }
        public AgeGroup AgeGroup { get; set; }
    }
}
