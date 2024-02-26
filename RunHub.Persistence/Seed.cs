using Microsoft.AspNetCore.Identity;
using RunHub.Domain.Entity;
using RunHub.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace RunHub.Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Races.Any() && !context.AgeGroups.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "jankow",
                        FirstName = "Jan",
                        LastName = "Kowalski",
                        Email = "jankow02@wp.pl"
                    },
                    new AppUser
                    {
                        DisplayName = "alejan",
                        FirstName = "Aleksandra",
                        LastName = "Jankowska",
                        Email = "alekjan@gmail.com"
                    },
                    new AppUser
                    {
                        DisplayName = "jacnow",
                        FirstName = "Jacek",
                        LastName = "Nowak",
                        Email = "jacnow@test1.pl"
                    },
                    new AppUser
                    {
                        DisplayName = "zofprz",
                        FirstName = "Zofia",
                        LastName = "Przybysz",
                        Email = "zofiap@test.pl"
                    },
                    new AppUser
                    {
                        DisplayName = "jestan",
                        FirstName = "Jerzy",
                        LastName = "Stankiewicz",
                        Email = "jstankiewicz@test.pl"
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                //age groups
                var ageGroups = new List<AgeGroup>
                {
                    new AgeGroup
                    {
                        GroupName = "Sample Group 1",
                        MinAge = 18,
                        MaxAge = 30,
                        Gender = "Male"
                    },
                    new AgeGroup
                    {
                        GroupName = "Sample Group 2",
                        MinAge = 31,
                        MaxAge = 50,
                        Gender = "Female"
                    },
                };

                //races
                var races = new List<Race>
                {
                    new Race
                    {
                        Name = "Barbarian Race",
                        Description = "Opis",
                        CreationDate = DateTime.UtcNow,
                        RegistrationEndDate = DateTime.UtcNow.AddDays(55),
                        StartDateRace = DateTime.UtcNow.AddDays(60),
                        EndDateRace = DateTime.UtcNow.AddDays(62),
                        Image = "sample.jpg",
                        RaceStatus = RaceStatus.OpenToRegistration,
                        RaceType = RaceType.Street,
                        CreatorAppUser = users[0],
                        Address = new Address
                        {
                            City = "Warszawa",
                            Street = "Marszałkowska 3",
                            Country = "Polska",
                            PostalCode = "00-259"
                        },
                        Distances = new List<Distance>
                        {
                           new Distance
                           {
                               Name = "Race",
                               LengthInKilometers = 10.0,
                               Description = "Przygoda życia",
                               AvailableSlots = 200,
                               TotalSlots = 200,
                               Price = 199.99m,
                               DistanceAttendees = new List<DistanceAttendee>
                               {
                                   new DistanceAttendee
                                   {
                                       Participator = users[1],
                                       IsPaid = true,
                                       PaidDate = DateTime.UtcNow.AddDays(20),
                                       Price = 199.99m,
                                       Result = new Result
                                       {
                                            ResultOpenGroup = 1,
                                            ResultAgeGroup = 1,
                                            ResultGender = 1,
                                            Time = TimeSpan.FromMinutes(25),
                                            AgeGroup = ageGroups[1],
                                       }
                                   },
                                   new DistanceAttendee
                                   {
                                       Participator = users[2],
                                       IsPaid = true,
                                       PaidDate = DateTime.UtcNow.AddDays(22),
                                       Price = 199.99m,
                                       Result = new Result
                                       {
                                            ResultOpenGroup = 2,
                                            ResultAgeGroup = 1,
                                            ResultGender = 2,
                                            Time = TimeSpan.FromMinutes(28),
                                            AgeGroup = ageGroups[0],
                                       }
                                   },

                               }
                           },
                           new Distance
                           {
                               Name = "Opener",
                               LengthInKilometers = 6.0,
                               Description = "Dystans dla początkujących",
                               AvailableSlots = 150,
                               TotalSlots = 150,
                               Price = 139.99m
                           }
                        },
                        Sponsors = new List<Sponsor>
                        {
                            new Sponsor
                            {
                                Name = "Sample Sponsor 1",
                                Logo = "sample_logo_1.jpg",
                                Description = "Sample Sponsor Description 1",
                                WebPageUrl = "http://www.samplesponsor1.com"
                            },
                            new Sponsor
                            {
                                Name = "Sample Sponsor 2",
                                Logo = "sample_logo_2.jpg",
                                Description = "Sample Sponsor Description 2",
                                WebPageUrl = "http://www.samplesponsor2.com"
                            }
                        },
                        RaceAgeGroups = new List<RaceAgeGroup>
                        {
                            new RaceAgeGroup
                            {
                                AgeGroup = ageGroups[0]
                            },
                            new RaceAgeGroup
                            {
                                AgeGroup = ageGroups[1]
                            }
                        }
                    }
                };
                await context.AgeGroups.AddRangeAsync(ageGroups);
                await context.Races.AddRangeAsync(races);
                await context.SaveChangesAsync();
            }
        }
    }
}
