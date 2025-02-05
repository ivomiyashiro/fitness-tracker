using api.Domain.WorkoutExercises.Dtos;

namespace api.Domain.WorkoutExercises.Services;

public interface IWorkoutExercisesService
{
  Task<bool> Delete(Guid guid);
  Task<IEnumerable<WorkoutExerciseResponseDto>> GetByWorkoutId(Guid workoutId);
  Task<WorkoutExerciseResponseDto?> Put(Guid guid, WorkoutExerciseUpdateDto dto);
  Task<WorkoutExerciseResponseDto> Post(WorkoutExerciseDto dto);
}
