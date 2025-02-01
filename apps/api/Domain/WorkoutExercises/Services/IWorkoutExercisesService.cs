using api.Domain.WorkoutExercises.Dtos;

namespace api.Domain.WorkoutExercises.Services;

public interface IWorkoutExercisesService
{
  Task<WorkoutExerciseResponseDto> GetByWorkoutId(Guid workoutId);
}
