using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RunHub.Domain.Entity;

namespace RunHub.Persistence.Configuration
{
    public class ResultConfiguration : IEntityTypeConfiguration<Result>
    {
        public void Configure(EntityTypeBuilder<Result> eb)
        {
            eb.HasKey(r => r.ResultId);

            eb.HasOne(r => r.User)
                .WithMany(u => u.Results)
                .HasForeignKey(r => r.UserId);

            eb.HasOne(r => r.Distance)
                .WithMany(d => d.Results)
                .HasForeignKey(r => r.DistanceId);
        }
    }
}
