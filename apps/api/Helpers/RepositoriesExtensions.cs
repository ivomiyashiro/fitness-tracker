using api.Data;
using api.Domain.Excercises;
using api.Domain.TrainingPlans;
using api.Domain.WorkoutExcercises;
using api.Domain.Workouts;

namespace api.Helpers
{
  public static class RepositoryExtensions
  {
    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
      services.AddScoped<IRepository<Excercise>, Repository<Excercise>>();
      services.AddScoped<IRepository<TrainingPlan>, Repository<TrainingPlan>>();
      services.AddScoped<IRepository<Workout>, Repository<Workout>>();
      services.AddScoped<IRepository<WorkoutExcercise>, Repository<WorkoutExcercise>>();

      return services;
    }
  }
}
