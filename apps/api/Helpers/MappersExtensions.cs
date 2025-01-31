using api.Domain.TrainingPlans.Mappers;
using api.Domain.Workouts.Mappers;

namespace api.Helpers;

public static class MapperExtensions
{
  public static IServiceCollection AddMappers(this IServiceCollection services)
  {
    services.AddScoped<ITrainingPlanMappers, TrainingPlanMappers>();
    services.AddScoped<IWorkoutMappers, WorkoutMappers>();

    return services;
  }
}

