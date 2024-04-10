using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using RunHub.API.Services;
using RunHub.Application.Core;
using RunHub.Domain.Entity;
using RunHub.Infrastructure.Security;
using RunHub.Persistence;
using System.Text;

namespace RunHub.API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddIdentity<AppUser,IdentityRole> (options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequiredLength = 4;
            })
                .AddEntityFrameworkStores<DataContext>()
                .AddSignInManager<SignInManager<AppUser>>()
                .AddDefaultTokenProviders();

            var issuer = config["JWT:Issuer"];
            var audience = config["JWT:Audience"];
            var tokenKey = config.GetSection("JWT:SigningKey").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme =
                options.DefaultChallengeScheme =
                options.DefaultForbidScheme =
                options.DefaultScheme =
                options.DefaultSignInScheme =
                options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = issuer,
                    ValidateAudience = true,
                    ValidAudience = audience,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key
                };
            });

            services.AddAuthorization(opt =>
            {
                opt.AddPolicy("IsRaceCreator", policy =>
                {
                    policy.Requirements.Add(new IsCreatorRequirement());
                });
            });

            services.AddTransient<IAuthorizationHandler, IsCreatorRequirementHandler>();

            services.AddScoped<ITokenService, TokenService>();


            return services;
        }
    }
}
