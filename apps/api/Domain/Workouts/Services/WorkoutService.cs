using api.Data;
using api.Domain.Workouts.Dtos;
using api.Domain.WorkoutExercises;
using api.Domain.Workouts.Mappers;

namespace api.Domain.Workouts.Services;

public class WorkoutService(
  AppDbContext _context,
  IRepository<Workout> workoutRepository,
  IRepository<WorkoutExercise> workoutExerciseRepository,
  IWorkoutMapper workoutMappers
) : IWorkoutService
{
  private readonly IRepository<Workout> _workoutRepository = workoutRepository;
  private readonly IRepository<WorkoutExercise> _workoutExerciseRepository = workoutExerciseRepository;
  private readonly IWorkoutMapper _workoutMappers = workoutMappers;

  public async Task<bool> Delete(Guid uid)
  {
    var workoutToDelete = await _workoutRepository.GetById(uid);
    if (workoutToDelete == null) return false;
    return await _workoutRepository.Delete(uid);
  }

  public async Task<IEnumerable<WorkoutResponseDto?>> GetByTraininPlanId(Guid trainingPlanId)
  {
    return await _workoutRepository.Get(
      select: workout => _workoutMappers.ResponseMap(workout),
      filter: x => x.TrainingPlanId == trainingPlanId
    );
  }

  public async Task<WorkoutResponseDto?> GetById(Guid guid)
  {
    var result = await _workoutRepository.GetById(guid);
    if (result == null) return null;
    return _workoutMappers.ResponseMap(result);
  }

  public async Task<IEnumerable<WorkoutResponseDto>> Get(int? limit, int? offset, string? search)
  {
    return await _workoutRepository.Get(
      select: workout => _workoutMappers.ResponseMap(workout),
      filter: null,
      orderBy: null,
      isAscending: true,
      limit,
      offset
    );
  }

  public async Task<WorkoutResponseDto?> Post(WorkoutDto dto)
  {
    using var transaction = await _context.Database.BeginTransactionAsync();
    try
    {
      var trainingPlans = await _workoutRepository.Get<Workout>();
      var lastOrder = trainingPlans.DefaultIfEmpty().Max(x => x?.Order ?? 0);

      var newWorkout = await _workoutRepository.Add(new Workout
      {
        TrainingPlanId = dto.TrainingPlanId,
        Order = (byte)(lastOrder + 1),
        Name = dto.Name,
      });

      foreach (var (exercise, index) in dto.Exercises.Select((ex, index) => (ex, index)))
      {
        await _workoutExerciseRepository.Add(new WorkoutExercise
        {
          WorkoutId = newWorkout.WorkoutId,
          ExerciseId = exercise.ExerciseId,
          Order = (byte)(index + 1),
        });
      }

      await transaction.CommitAsync();

      var result = await _workoutRepository.Get(
        select: workout => _workoutMappers.ResponseMap(workout),
        filter: workout => workout.WorkoutId == newWorkout.WorkoutId
      );

      return result.FirstOrDefault();
    }
    catch (Exception)
    {
      await transaction.RollbackAsync();
      throw;
    }
  }

  public async Task<WorkoutResponseDto?> Put(Guid uid, WorkoutDto dto)
  {
    var workout = await _workoutRepository.GetById(uid);
    if (workout is null) return null;

    var updatedWorkout = _workoutMappers.PutMap(workout, dto);
    if (updatedWorkout is null) return null;

    var result = await _workoutRepository.Update(updatedWorkout);

    return _workoutMappers.ResponseMap(result);
  }
}
