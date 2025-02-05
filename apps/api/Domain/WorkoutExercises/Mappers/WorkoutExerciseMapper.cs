using api.Domain.Sets;
using api.Domain.Sets.Dtos;
using api.Domain.WorkoutExercises.Dtos;
using Mapster;

namespace api.Domain.WorkoutExercises.Mappers;

public class WorkoutExerciseMapper : IWorkoutExerciseMapper
{
  public WorkoutExercise PutMap(WorkoutExercise workoutExercise, WorkoutExerciseUpdateDto dto)
  {
    return new WorkoutExercise
    {
      WorkoutExerciseId = workoutExercise.WorkoutExerciseId,
      WorkoutId = dto.Workout.WorkoutId,
      ExerciseId = dto.Exercise.ExerciseId,
      Order = (byte)(dto.Order is null ? workoutExercise.Order : dto.Order),
      Sets = [.. dto.Exercise.Sets.Select(x => x.Adapt<Set>())],
    };
  }

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
        Sets = workoutExercise.Sets.Select(x => x.Adapt<SetResponseDto>())
      },
      Workout = new WorkoutExerciseResponseDto.WorkoutDto
      {
        WorkoutId = workoutExercise.WorkoutId,
        Name = workoutExercise.Workout.Name,
      }
    };
  }
}
