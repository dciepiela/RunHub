using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RunHub.Domain.Entity;

namespace RunHub.Persistence.Configuration
{
    public class RaceAgeGroupConfiguration : IEntityTypeConfiguration<RaceAgeGroup>
    {
        public void Configure(EntityTypeBuilder<RaceAgeGroup> eb)
        {
            // Many-to-Many relationship between Race and AgeGroup
            eb.HasKey(rg => new { rg.RaceId, rg.AgeGroupId });

            eb.HasOne(rg => rg.Race)
                .WithMany(r => r.RaceAgeGroups)
                .HasForeignKey(rg => rg.RaceId);

            eb.HasOne(rg => rg.AgeGroup)
                .WithMany(ag => ag.RaceAgeGroups)
                .HasForeignKey(rg => rg.AgeGroupId);
        }
    }
}
