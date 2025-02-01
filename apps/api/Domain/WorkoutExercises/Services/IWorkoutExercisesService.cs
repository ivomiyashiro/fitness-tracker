using api.Domain.WorkoutExercises.Dtos;

namespace api.Domain.WorkoutExercises.Services;

public interface IWorkoutExercisesService
{
  Task<IEnumerable<WorkoutExerciseResponseDto>> GetByWorkoutId(Guid workoutId);
}
