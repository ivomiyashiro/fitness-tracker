using api.Data;
using api.Domain.WorkoutExercises.Dtos;

namespace api.Domain.WorkoutExercises.Services;

public class WorkoutExercisesService(
  IRepository<WorkoutExercise> workoutExerciseRepository
) : IWorkoutExercisesService
{
  private readonly IRepository<WorkoutExercise> _workoutExerciseRepository;

  public async Task<WorkoutExerciseResponseDto> GetByWorkoutId(Guid workoutId)
  {
    return await _workoutExerciseRepository.Get(
      select: we => new
    )
  }
}
