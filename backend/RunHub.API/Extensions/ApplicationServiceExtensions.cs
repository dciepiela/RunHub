using Microsoft.EntityFrameworkCore;
using RunHub.Persistence;
using RunHub.Application;
using RunHub.Application.Core;
using RunHub.API.Services;
using Microsoft.OpenApi.Models;
using RunHub.Application.Interfaces;
using RunHub.Infrastructure.Security;
using RunHub.Infrastructure.Photos;
using RunHub.Infrastructure.Email;
using RunHub.Infrastructure.Payment;

namespace RunHub.API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "RunHub API", Version = "v1" });

                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter a valid token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "Bearer"
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id="Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });

            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            //CORS

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials()
                        .WithOrigins("http://localhost:3001", "http://localhost:3000");
                        //.SetIsOriginAllowed(origin => true);
                });
            });

            services.AddApplication();
            //services.AddExceptionHandler<ExceptionHandler>();

            //STRIPE
            services.AddScoped<IStripeService, StripeService>();

            services.AddScoped<ITokenService, TokenService>();
            services.AddHttpContextAccessor();
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.AddScoped<EmailSender>();

            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));

            return services;
        }
    }
}
