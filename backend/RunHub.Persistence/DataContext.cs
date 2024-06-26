﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RunHub.Domain.Entities;
using RunHub.Domain.Entity;

namespace RunHub.Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options) { }

        public DbSet<Address> Addresses { get; set; }
        public DbSet<Distance> Distances { get; set; }
        public DbSet<DistanceAttendee> DistanceAttendees { get; set; }
        public DbSet<Race> Races { get; set; }
        public DbSet<Result> Results { get; set; }
        public DbSet<Sponsor> Sponsors { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(this.GetType().Assembly);
        }
    }
}
