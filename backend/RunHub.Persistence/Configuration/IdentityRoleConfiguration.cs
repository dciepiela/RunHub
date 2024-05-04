using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Data;

namespace RunHub.Persistence.Configuration
{
    public class IdentityRoleConfiguration : IEntityTypeConfiguration<IdentityRole>
    {
        private readonly RoleManager<IdentityUser> _roleManager;

        public IdentityRoleConfiguration(RoleManager<IdentityUser> roleManager)
        {
            _roleManager = roleManager;
        }
        public async void Configure(EntityTypeBuilder<IdentityRole> eb)
        {
            var roles = new List<IdentityRole>
            {
                new IdentityRole { Name = "Competitor", NormalizedName = "COMPETITOR" },
                new IdentityRole { Name = "Organizer", NormalizedName = "ORGANIZER" }
            };

            // Query the database to check if roles already exist
            foreach (var role in roles)
            {
                var existingRole = await _roleManager.FindByNameAsync(role.Name);
                if (existingRole == null)
                {
                    // Add role if it doesn't exist
                    eb.HasData(role);
                }
            }
        }
    }
}
