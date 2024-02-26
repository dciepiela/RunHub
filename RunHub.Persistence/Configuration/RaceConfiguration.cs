using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RunHub.Domain.Entity;
using RunHub.Domain.Enum;

namespace RunHub.Persistence.Configuration
{
    public class RaceConfiguration : IEntityTypeConfiguration<Race>
    {
        public void Configure(EntityTypeBuilder<Race> eb)
        {
            // One-to-One relationship between Race and Address
            eb.HasOne(r => r.Address)
                .WithOne(a => a.Race)
                .HasForeignKey<Address>(a => a.RaceId)
                .OnDelete(DeleteBehavior.Cascade);

            // One-to-Many relationship between Race and Distance
            eb.HasMany(r => r.Distances)
                .WithOne(d => d.Race)
                .HasForeignKey(d => d.RaceId)
                .OnDelete(DeleteBehavior.Cascade);

            // Properties

            eb.Property(r => r.RaceStatus).HasConversion(c => c.ToString(), c => Enum.Parse<RaceStatus>(c));

            eb.Property(r => r.RaceType).HasConversion(c => c.ToString(), c => Enum.Parse<RaceType>(c));
        }
    }
}
