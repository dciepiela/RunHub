using Microsoft.AspNetCore.Identity;
using RunHub.Domain.Entity;
using RunHub.Domain.Enum;

namespace RunHub.Persistence
{
    public static class Seed2
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            if (!userManager.Users.Any())
            {
                var roles = new List<string>
                {
                    "Competitor",
                    "Organizer"
                };

                foreach (var role in roles)
                {
                    if (!await roleManager.RoleExistsAsync(role))
                    {
                        await roleManager.CreateAsync(new IdentityRole(role));
                    }
                }

                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Jan Kowalski",
                        UserName = "jankow",
                        Email = "jankow@example.com",
                        FirstName = "Jan",
                        LastName = "Kowalski",
                        Nationality = "Polish",
                        Gender = "M",
                        DateOfBirth = new DateOnly(1985, 1, 1),
                        Bio = "Enthusiastic marathon runner.",
                        Club = "Runners Club",
                        Address = new Address
                        {
                            City = "Warsaw",
                            Street = "Nowy Świat 15",
                            PostalCode = "00-372"
                        }
                    },
                    new AppUser
                    {
                        DisplayName = "Alex Jane",
                        UserName = "alejan",
                        Email = "alexjane@example.com",
                        FirstName = "Alex",
                        LastName = "Jane",
                        Nationality = "Canadian",
                        Gender = "K",
                        DateOfBirth = new DateOnly(1990, 4, 23),
                        Bio = "Loves short races and fun runs.",
                        Club = "Fun Runners",
                        Address = new Address
                        {
                            City = "Kraków",
                            Street = "Rynek Główny 1",
                            PostalCode = "31-042"
                        }
                    },
                    new AppUser
                    {
                        DisplayName = "Jack Nowak",
                        UserName = "jacnow",
                        Email = "jacknowak@example.com",
                        FirstName = "Jack",
                        LastName = "Nowak",
                        Nationality = "American",
                        Gender = "M",
                        DateOfBirth = new DateOnly(1992, 8, 15),
                        Bio = "Trail runner passionate about nature.",
                        Club = "Trail Blazers",
                        Address = new Address
                        {
                            City = "Gdańsk",
                            Street = "Długi Targ 6",
                            PostalCode = "80-828"
                        }
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(user, "Competitor");
                }

                var organizerUser = new AppUser
                {
                    DisplayName = "Anna Kowalska",
                    UserName = "annakow",
                    Email = "annakow@example.com",
                    FirstName = "Anna",
                    LastName = "Kowalska",
                    Nationality = "Polish",
                    Gender = "K",
                    DateOfBirth = new DateOnly(1985, 4, 22),
                    Bio = "Passionate about running and fitness.",
                    ContactNumber = "+48 123 456 789",
                    Club = "Runners Club",
                    Address = new Address
                    {
                        City = "Warsaw",
                        Street = "Łazienkowska 3",
                        PostalCode = "00-449"
                    }
                };

                await userManager.CreateAsync(organizerUser, "Pa$$w0rd");
                await userManager.AddToRoleAsync(organizerUser, "Organizer");

                //dystanse
                var distances = new List<Distance>
                {
                    new Distance
                    {
                        Name = "5K Fun Run",
                        LengthInKilometers = 5,
                        Description = "A fun run for all the family!",
                        TotalSlots = 500,
                        AvailableSlots = 500,
                        Price = 25m
                    },
                    new Distance
                    {
                        Name = "City Marathon",
                        LengthInKilometers = 42.195,
                        Description = "Annual city marathon with scenic routes.",
                        TotalSlots = 3000,
                        AvailableSlots = 3000,
                        Price = 80m
                    }
                };

                //sponsorzy
                var sponsors = new List<Sponsor>
                {
                    new Sponsor
                    {
                        Name = "HealthPlus",
                        Logo = "healthplus_logo.jpg",
                        Description = "Leading provider of health supplements.",
                        WebPageUrl = "http://www.healthplus.com"
                    },
                    new Sponsor
                    {
                        Name = "RunFast Sports Gear",
                        Logo = "runfast_logo.jpg",
                        Description = "High-quality sports gear for the elite athlete.",
                        WebPageUrl = "http://www.runfast.com"
                    }
                };


                //bieg
                var race = new Race
                {
                    Name = "Annual City Marathon",
                    Description = "The best city marathon, attracting runners from all over the world.",
                    RegistrationEndDate = DateTime.UtcNow.AddDays(55),
                    StartDateRace = DateTime.UtcNow.AddDays(60),
                    EndDateRace = DateTime.UtcNow.AddDays(61),
                    RaceStatus = RaceStatus.OpenToRegistration,
                    RaceType = RaceType.OCR,
                    Distances = distances,
                    Sponsors = sponsors,
                    Address = new Address
                    {
                        City = "New York",
                        Street = "Central Park West",
                        PostalCode = "10023"
                    },
                    CreatorAppUser = organizerUser
                };

                //uczestnicy biegu
                var distanceAttendees = new List<DistanceAttendee>
                {
                    new DistanceAttendee
                    {
                        Participator = users[1],
                        Distance = distances[0],
                        IsPaid = true,
                        PaidDate = DateTime.UtcNow.AddDays(-10),
                        Price = 25m
                    },
                    new DistanceAttendee
                    {
                        Participator = users[2],
                        Distance = distances[1],
                        IsPaid = true,
                        PaidDate = DateTime.UtcNow.AddDays(-15),
                        Price = 80m
                    }
                };

                //wyniki
                var results = new List<Result>
                {
                    new Result
                    {
                        User = users[1],
                        Distance = distances[1],
                        Time = TimeSpan.FromSeconds(500),
                    },
                    new Result
                    {
                        User = users[2],
                        Distance = distances[1],
                        Time = TimeSpan.FromSeconds(1074), // 00:17:54 expressed as seconds
                    },
                };

                await context.AddRangeAsync(distanceAttendees);
                await context.AddRangeAsync(results);

                await context.Races.AddAsync(race);

                await context.SaveChangesAsync();
            }
        }

    }
}
