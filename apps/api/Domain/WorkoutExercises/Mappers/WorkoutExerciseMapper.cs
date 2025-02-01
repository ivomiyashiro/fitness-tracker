using api.Domain.WorkoutExercises.Dtos;

namespace api.Domain.WorkoutExercises.Mappers;

public class WorkoutExerciseMapper : IWorkoutExerciseMapper
{
  public WorkoutExerciseResponseDto ResponseMap(WorkoutExercise workoutExercise)
  {
    var exerciseDto = workoutExercise.Exercise != null
        ? new WorkoutExerciseResponseDto.ExerciseDto
        {
          ExerciseId = workoutExercise.Exercise.ExerciseId,
          Name = workoutExercise.Exercise.Name,
        }
        : null;

    var workoutDto = workoutExercise.Workout != null
        ? new WorkoutExerciseResponseDto.WorkoutDto
        {
          WorkoutId = workoutExercise.WorkoutId,
          Name = workoutExercise.Workout.Name,
        }
        : null;

    return new WorkoutExerciseResponseDto
    {
      WorkoutExerciseId = workoutExercise.WorkoutExerciseId,
      Order = workoutExercise.Order,
      Exercise = exerciseDto,
      Workout = workoutDto
    };
  }

}
