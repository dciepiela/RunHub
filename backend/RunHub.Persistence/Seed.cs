using Microsoft.AspNetCore.Identity;
using RunHub.Domain.Entity;
using RunHub.Domain.Enum;


namespace RunHub.Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Races.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "JanKow",
                        UserName = "jankow",
                        Email = "jankow02@wp.pl"
                    },
                    new AppUser
                    {
                        DisplayName = "AleJan",
                        UserName = "alejan",
                        Email = "alekjan@gmail.com"
                    },
                    new AppUser
                    {
                        DisplayName = "JacNow",
                        UserName = "jacnow",
                        Email = "jacnow@test1.pl"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }


                //distances for race
                var distances = new List<Distance>
                {
                    new Distance
                    {
                        Name = "Barbarian Race",
                        LengthInKilometers = 12.0,
                        Description = "Poziom zaawansowany",
                        AvailableSlots = 200,
                        TotalSlots = 200,
                        Price = 199.99m,
                    },
                    new Distance
                    {
                        Name = "Barbarian Opener",
                        LengthInKilometers = 6.0,
                        Description = "Dla zaczynających bieganie",
                        AvailableSlots = 150,
                        TotalSlots = 150,
                        Price = 149.99m,
                    }
                };

                //races
                var races = new List<Race>
                {
                    new Race
                    {
                        Name = "Barbarian Race",
                        Description = "Opis",
                        RegistrationEndDate = DateTime.UtcNow.AddDays(55),
                        StartDateRace = DateTime.UtcNow.AddDays(60),
                        EndDateRace = DateTime.UtcNow.AddDays(62),
                        RaceStatus = RaceStatus.OpenToRegistration,
                        RaceType = RaceType.Street,
                        CreatorAppUser = users[0],
                        Address = new Address
                        {
                            City = "Warszawa",
                            Street = "Marszałkowska 3",
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
                               //DistanceAttendees = new List<DistanceAttendee>
                               //{
                               //    new DistanceAttendee
                               //    {
                               //        Participator = users[1],
                               //        IsPaid = true,
                               //        PaidDate = DateTime.UtcNow.AddDays(20),
                               //        Price = 199.99m,
                               //        //Result = new Result
                               //        //{
                               //        //     ResultOpenGroup = 1,
                               //        //     ResultAgeGroup = 1,
                               //        //     ResultGender = 1,
                               //        //     Time = TimeSpan.FromMinutes(25),
                               //        //     AgeGroup = ageGroups[1],
                               //        //}
                               //    },
                               //    new DistanceAttendee
                               //    {
                               //        Participator = users[2],
                               //        IsPaid = true,
                               //        PaidDate = DateTime.UtcNow.AddDays(22),
                               //        Price = 199.99m,
                               //        //Result = new Result
                               //        //{
                               //        //     ResultOpenGroup = 2,
                               //        //     ResultAgeGroup = 1,
                               //        //     ResultGender = 2,
                               //        //     Time = TimeSpan.FromMinutes(28),
                               //        //     AgeGroup = ageGroups[0],
                               //        //}
                               //    },

                               //}
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
                    }
                };

                await context.Users.AddRangeAsync(users);
                //await context.AgeGroups.AddRangeAsync(ageGroups);
                await context.Races.AddRangeAsync(races);
                await context.SaveChangesAsync();
            }
        }
    }
}
