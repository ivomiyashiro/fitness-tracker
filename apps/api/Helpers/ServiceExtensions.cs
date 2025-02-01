using System.Text.Json.Serialization;
using api.Domain.Exercises.Services;
using api.Domain.TrainingPlans.Services;
using api.Domain.WorkoutExercises.Services;
using api.Domain.Workouts.Services;

namespace api.Helpers
{
  public static class ServiceExtensions
  {
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
      services.AddScoped<IExerciseService, ExerciseService>();
      services.AddScoped<ITrainingPlanService, TrainingPlanService>();
      services.AddScoped<IWorkoutService, WorkoutService>();
      services.AddScoped<IWorkoutExercisesService, WorkoutExercisesService>();

      return services;
    }
  }
}
