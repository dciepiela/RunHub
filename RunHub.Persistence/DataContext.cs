using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RunHub.Domain.Entity;

namespace RunHub.Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options):base(options) { }

        public DbSet<Address> Addresses { get; set; }
        public DbSet<AgeGroup> AgeGroups { get; set; }
        public DbSet<Distance> Distances { get; set; }
        public DbSet<DistanceAttendee> DistanceAttendees { get; set; }
        public DbSet<Race> Races { get; set; }
        public DbSet<RaceAgeGroup> RaceAgeGroups { get; set; }
        public DbSet<Result> Results { get; set; }
        public DbSet<Sponsor> Sponsors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Define relationships here
            base.OnModelCreating(modelBuilder);

            // One-to-One relationship between AppUser and Address
            modelBuilder.Entity<Address>()
                .HasOne(a => a.AppUser)
                .WithOne(u => u.Address)
                .HasForeignKey<AppUser>(u => u.AddressId);

            // One-to-One relationship between Race and Address
            modelBuilder.Entity<Race>()
                .HasOne(r => r.Address)
                .WithOne(a => a.Race)
                .HasForeignKey<Address>(a => a.RaceId);

            // One-to-Many relationship between Race and Distance
            modelBuilder.Entity<Distance>()
                .HasOne(d => d.Race)
                .WithMany(r => r.Distances)
                .HasForeignKey(d => d.RaceId);

            // Many-to-Many relationship between Race and AgeGroup
            modelBuilder.Entity<RaceAgeGroup>()
                .HasKey(rg => new { rg.RaceId, rg.AgeGroupId });

            modelBuilder.Entity<RaceAgeGroup>()
                .HasOne(rg => rg.Race)
                .WithMany(r => r.RaceAgeGroups)
                .HasForeignKey(rg => rg.RaceId);

            modelBuilder.Entity<RaceAgeGroup>()
                .HasOne(rg => rg.AgeGroup)
                .WithMany(ag => ag.RaceAgeGroups)
                .HasForeignKey(rg => rg.AgeGroupId);

            // One-to-Many relationship between Race and Sponsor
            modelBuilder.Entity<Sponsor>()
                .HasOne(s => s.Race)
                .WithMany(r => r.Sponsors)
                .HasForeignKey(s => s.RaceId);

            // One-to-Many relationship between AppUser and DistanceAttendee
            // Configure DistanceAttendee entity
            modelBuilder.Entity<DistanceAttendee>()
                .HasKey(da => da.DistanceAttendeeId);

            // Define relationships
            modelBuilder.Entity<DistanceAttendee>()
                .HasOne(da => da.Participator)
                .WithMany(u => u.DistanceAttendees)
                .HasForeignKey(da => da.ParticipatorId);

            modelBuilder.Entity<DistanceAttendee>()
                .HasOne(da => da.Distance)
                .WithMany(d => d.DistanceAttendees)
                .HasForeignKey(da => da.DistanceId);

            // One-to-Many relationship between AgeGroup and Result
            modelBuilder.Entity<Result>()
                .HasOne(r => r.AgeGroup)
                .WithMany(ag => ag.Results)
                .HasForeignKey(r => r.AgeGroupId);

            // One-to-One relationship between DistanceAttendee and Result
            modelBuilder.Entity<Result>()
                .HasOne(r => r.RaceUser)
                .WithOne(da => da.Result)
                .HasForeignKey<DistanceAttendee>(da => da.DistanceAttendeeId);
        }
    }
}
