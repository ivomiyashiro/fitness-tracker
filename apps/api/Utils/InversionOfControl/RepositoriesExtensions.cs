using api.Data;
using api.Domain.Exercises;
using api.Domain.Sets;
using api.Domain.TrainingPlans;
using api.Domain.WorkoutExercises;
using api.Domain.Workouts;

namespace api.Utils.InversionOfControl;

public static class RepositoryExtensions
{
  public static IServiceCollection AddRepositories(this IServiceCollection services)
  {
    services.AddScoped<IRepository<Exercise>, Repository<Exercise>>();
    services.AddScoped<IRepository<TrainingPlan>, Repository<TrainingPlan>>();
    services.AddScoped<IRepository<Workout>, Repository<Workout>>();
    services.AddScoped<IRepository<WorkoutExercise>, Repository<WorkoutExercise>>();
    services.AddScoped<IRepository<Set>, Repository<Set>>();

    return services;
  }
}

