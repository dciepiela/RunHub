using FluentValidation;
using Mapster;
using Microsoft.Extensions.DependencyInjection;
using RunHub.Application.Behaviors;
using RunHub.Application.Mappings;
using System.Reflection;

namespace RunHub.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddMediatR(config =>
            {
                config.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());

                config.AddOpenBehavior(typeof(ValidationBehavior<,>)); //it will be generic so ,
            });

            MappingConfig.Configure();
            var config = TypeAdapterConfig.GlobalSettings;
            config.Scan(Assembly.GetExecutingAssembly());
            services.AddSingleton(config);

            //register FluentValidation
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

            return services;
        }
    }
}
