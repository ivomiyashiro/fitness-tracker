using System.Text.Json.Serialization;
using api.Domain.Excercises.Services;
using api.Domain.TrainingPlans.Services;
using api.Domain.Workouts.Services;

namespace api.Helpers
{
  public static class ServiceExtensions
  {
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
      services.AddScoped<IExcerciseService, ExcerciseService>();
      services.AddScoped<ITrainingPlanService, TrainingPlanService>();
      services.AddScoped<IWorkoutService, WorkoutService>();

      return services;
    }
  }
}
