using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RunHub.Persistence.Configuration
{
    public class IdentityRoleConfiguration : IEntityTypeConfiguration<IdentityRole>
    {
        public void Configure(EntityTypeBuilder<IdentityRole> eb)
        {
            List<IdentityRole> roles = new List<IdentityRole> {
                new IdentityRole
                {
                    Name = "Competitor",
                    NormalizedName="COMPETITOR"
                },
                new IdentityRole
                {
                    Name = "Organizer",
                    NormalizedName="ORGANIZER"
                }
            };
            eb.HasData(roles);
        }
    }
}
