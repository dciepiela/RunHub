namespace RunHub.Domain.Entity
{
    public class AgeGroup
    {
        public int AgeGroupId { get; set; }
        public string GroupName { get; set; }  // e.g., "Under 18", "18-25", "26-35", etc.
        public int MinAge { get; set; }
        public int MaxAge { get; set; }
        public string Gender {  get; set; }

        // Navigation property
        public ICollection<RaceAgeGroup> RaceAgeGroups { get; set; }
        //public ICollection<Result> Results { get; set; }
    }
}
