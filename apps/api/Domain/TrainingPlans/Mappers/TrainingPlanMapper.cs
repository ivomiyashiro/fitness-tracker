using Mapster;
using api.Domain.TrainingPlans.Dtos;
using api.Domain.Exercises.Dtos;
using api.Domain.Workouts.Dtos;

namespace api.Domain.TrainingPlans.Mappers;

public class TrainingPlanMapper : ITrainingPlanMapper
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
        Exercises = workout.WorkoutExercises.Select(exercise => new ExerciseResponseDto
        {
          ExerciseId = exercise.ExerciseId,
          Name = exercise.Exercise!.Name,
        })
      })
    };
  }
}
