﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RunHub.Domain.Entity;

namespace RunHub.Persistence.Configuration
{
    public class SponsorConfiguration : IEntityTypeConfiguration<Sponsor>
    {
        public void Configure(EntityTypeBuilder<Sponsor> eb)
        {
            // One-to-Many relationship between Race and Sponsor
            eb.HasOne(s => s.Race)
                .WithMany(r => r.Sponsors)
                .HasForeignKey(s => s.RaceId);
        }
    }
}
