using Mapster;
using api.Domain.TrainingPlans.Dtos;
using api.Domain.Excercises.Dtos;
using api.Domain.Workouts.Dtos;

namespace api.Domain.TrainingPlans.Mappers;

public class TrainingPlanMappers : ITrainingPlanMappers
{
  public TrainingPlan PostMap(TrainingPlanDto dto)
  {
    return dto.Adapt<TrainingPlan>();
  }

  public TrainingPlan PutMap(TrainingPlan trainingPlan, TrainingPlanDto dto)
  {
    trainingPlan.Name = dto.Name;
    trainingPlan.Description = dto.Description;
    trainingPlan.Weeks = dto.Weeks;

    return trainingPlan;
  }

  public TrainingPlanResponseDto ResponseMap(TrainingPlan trainingPlan)
  {
    return new TrainingPlanResponseDto
    {
      TrainingPlanId = trainingPlan.TrainingPlanId,
      Name = trainingPlan.Name,
      Weeks = trainingPlan.Weeks,
      Description = trainingPlan.Description,
      Workouts = trainingPlan.Workouts.Select(workout => new WorkoutResponseDto
      {
        WorkoutId = workout.WorkoutId,
        Name = workout.Name,
        Excercises = workout.WorkoutExcercises.Select(excercise => new ExcerciseResponseDto
        {
          ExcerciseId = excercise.ExcerciseId,
          Name = excercise.Excercise!.Name,
        })
      })
    };
  }
}
