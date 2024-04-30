using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RunHub.Domain.Entity;

namespace RunHub.Persistence.Configuration
{
    public class DistanceAttendeeConfiguration : IEntityTypeConfiguration<DistanceAttendee>
    {
        public void Configure(EntityTypeBuilder<DistanceAttendee> eb)
        {
            eb.HasKey(da => new { da.ParticipatorId, da.DistanceId });

            eb.HasOne(da => da.Participator)
                .WithMany(u => u.Distances)
                .HasForeignKey(da => da.ParticipatorId);

            eb.HasOne(da => da.Distance)
                .WithMany(d => d.DistanceAttendees)
                .HasForeignKey(da => da.DistanceId);

            eb.Property(da => da.Price).HasPrecision(14, 2);
        }
    }
}
