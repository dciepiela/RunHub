using Microsoft.EntityFrameworkCore;
using RunHub.Persistence;
using RunHub.Application;
using RunHub.API.Handlers;

namespace RunHub.API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            services.AddApplication();
            services.AddExceptionHandler<ExceptionHandler>();

            return services;
        }
    }
}
