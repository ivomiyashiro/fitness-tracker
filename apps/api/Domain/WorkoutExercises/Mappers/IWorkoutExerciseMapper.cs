using api.Domain.WorkoutExercises.Dtos;

namespace api.Domain.WorkoutExercises.Mappers;

public interface IWorkoutExerciseMapper
{
  WorkoutExercise PutMap(WorkoutExercise workoutExercise, WorkoutExerciseUpdateDto dto);
  WorkoutExerciseResponseDto ResponseMap(WorkoutExercise workoutExercise);
}
