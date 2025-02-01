using api.Data;
using api.Domain.WorkoutExercises.Dtos;
using api.Domain.WorkoutExercises.Mappers;

namespace api.Domain.WorkoutExercises.Services;

public class WorkoutExercisesService(
  IRepository<WorkoutExercise> workoutExerciseRepository,
  IWorkoutExerciseMapper workoutExcerciseMapper
) : IWorkoutExercisesService
{
  private readonly IRepository<WorkoutExercise> _workoutExerciseRepository = workoutExerciseRepository;
  private readonly IWorkoutExerciseMapper _workoutExercisesMapper = workoutExcerciseMapper;

  public async Task<IEnumerable<WorkoutExerciseResponseDto>> GetByWorkoutId(Guid workoutId)
  {
    return await _workoutExerciseRepository.Get(
      select: we => _workoutExercisesMapper.ResponseMap(we),
      filter: we => we.WorkoutId == workoutId
    );
  }
}
