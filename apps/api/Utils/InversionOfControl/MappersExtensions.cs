using api.Domain.Sets.Mappers;
using api.Domain.TrainingPlans.Mappers;
using api.Domain.WorkoutExercises.Mappers;
using api.Domain.Workouts.Mappers;

namespace api.Utils.InversionOfControl;

public static class MapperExtensions
{
  public static IServiceCollection AddMappers(this IServiceCollection services)
  {
    services.AddScoped<ITrainingPlanMapper, TrainingPlanMapper>();
    services.AddScoped<IWorkoutMapper, WorkoutMapper>();
    services.AddScoped<IWorkoutExerciseMapper, WorkoutExerciseMapper>();
    services.AddScoped<ISetMapper, SetMapper>();

    return services;
  }
}

