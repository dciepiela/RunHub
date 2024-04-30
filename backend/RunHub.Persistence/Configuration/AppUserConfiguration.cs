using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RunHub.Domain.Entity;

namespace RunHub.Persistence.Configuration
{
    public class AppUserConfiguration : IEntityTypeConfiguration<AppUser>
    {
        public void Configure(EntityTypeBuilder<AppUser> eb)
        {
            eb.HasOne(a => a.Address)
                .WithOne(u => u.AppUser)
                .HasForeignKey<Address>(u => u.AppUserId)
                .OnDelete(DeleteBehavior.Cascade);

            eb.HasOne(r => r.Photo)
                .WithOne()
                .HasForeignKey<AppUser>(u => u.PhotoId);
        }
    }
}
