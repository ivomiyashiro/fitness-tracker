using api.Domain.WorkoutExercises.Dtos;

namespace api.Domain.WorkoutExercises.Mappers;

public interface IWorkoutExerciseMapper
{
  WorkoutExerciseResponseDto ResponseMap(WorkoutExercise workoutExercise);
}
