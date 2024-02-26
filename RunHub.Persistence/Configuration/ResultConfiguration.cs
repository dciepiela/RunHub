using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RunHub.Domain.Entity;

namespace RunHub.Persistence.Configuration
{
    public class ResultConfiguration : IEntityTypeConfiguration<Result>
    {
        public void Configure(EntityTypeBuilder<Result> eb)
        {
            // One-to-Many relationship between AgeGroup and Result
            eb.HasOne(r => r.AgeGroup)
                .WithMany(ag => ag.Results)
                .HasForeignKey(r => r.AgeGroupId);

            // One-to-One relationship between DistanceAttendee and Result
            eb.HasOne(r => r.DistanceAttendee)
                .WithOne(da => da.Result)
                .HasForeignKey<DistanceAttendee>(da => da.DistanceAttendeeId);
        }
    }
}
