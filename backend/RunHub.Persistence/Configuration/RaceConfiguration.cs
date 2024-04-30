using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RunHub.Domain.Entity;

namespace RunHub.Persistence.Configuration
{
    public class RaceConfiguration : IEntityTypeConfiguration<Race>
    {
        public void Configure(EntityTypeBuilder<Race> eb)
        {
            eb.HasOne(r => r.Address)
                .WithOne(a => a.Race)
                .HasForeignKey<Address>(a => a.RaceId)
                .OnDelete(DeleteBehavior.Cascade);

            eb.HasMany(r => r.Distances)
                .WithOne(d => d.Race)
                .HasForeignKey(d => d.RaceId)
                .OnDelete(DeleteBehavior.Cascade);

            eb.HasOne(r => r.Photo)
                .WithOne()
                .HasForeignKey<Race>(r => r.PhotoId);
        }
    }
}
