using Mapster;
using api.Domain.WorkoutExercises.Dtos;

namespace api.Domain.WorkoutExercises.Mappers;

public class WorkoutExerciseMapper : IWorkoutExerciseMapper
{
  public WorkoutExerciseResponseDto ResponseMap(WorkoutExercise workoutExercise)
  {
    var workoutResponse = workoutExercise.Workout.Adapt<WorkoutExercise>();

    return new WorkoutExerciseResponseDto
    {
      WorkoutExerciseId = workoutExercise.WorkoutExerciseId,
      Order = workoutExercise.Order,
      Exercise = new WorkoutExerciseResponseDto.Exercise
      {
        ExerciseId = workoutExercise.Exercise.ExerciseId,
        Name = workoutExercise.Exercise.Name
      }
    };
  }
}
