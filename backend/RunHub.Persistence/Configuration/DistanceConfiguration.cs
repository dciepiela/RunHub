using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RunHub.Domain.Entity;

namespace RunHub.Persistence.Configuration
{
    public class DistanceConfiguration : IEntityTypeConfiguration<Distance>
    {
        public void Configure(EntityTypeBuilder<Distance> eb)
        {
            eb.Property(d => d.Price).HasPrecision(14, 2);
        }
    }
}
