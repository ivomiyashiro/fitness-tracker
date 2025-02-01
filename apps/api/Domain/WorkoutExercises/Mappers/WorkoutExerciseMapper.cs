using api.Domain.WorkoutExercises.Dtos;

namespace api.Domain.WorkoutExercises.Mappers;

public class WorkoutExerciseMapper : IWorkoutExerciseMapper
{
  public WorkoutExerciseResponseDto ResponseMap(WorkoutExercise workoutExercise)
  {
    return new WorkoutExerciseResponseDto
    {
      WorkoutExerciseId = workoutExercise.WorkoutExerciseId,
      Order = workoutExercise.Order,
      Exercise = new WorkoutExerciseResponseDto.ExerciseDto
      {
        ExerciseId = workoutExercise.Exercise.ExerciseId,
        Name = workoutExercise.Exercise.Name,
      },
      Workout = new WorkoutExerciseResponseDto.WorkoutDto
      {
        WorkoutId = workoutExercise.WorkoutId,
        Name = workoutExercise.Workout.Name,
      }
    };
  }
}
