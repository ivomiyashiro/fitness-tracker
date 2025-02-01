namespace api.Utils;

public static class CorsService
{

  public static IServiceCollection AddCustomCors(this IServiceCollection services, IConfiguration configuration)
  {
    var allowedOrigins = configuration.GetSection("AllowedHosts").Get<string[]>() ?? new[] { "*" };

    services.AddCors(options =>
    {
      options.AddPolicy("AllowWebApp", policy =>
            {
              policy.WithOrigins(allowedOrigins)
                          .AllowAnyHeader()
                          .AllowAnyMethod();
            });
    });

    return services;
  }
}

