using System.Xml;
using api.Data;
using api.Domain.Exercises.Services;
using api.Domain.Sets;
using api.Domain.Sets.Mappers;
using api.Domain.Sets.Services;
using api.Domain.WorkoutExercises.Dtos;
using api.Domain.WorkoutExercises.Mappers;
using api.Domain.Workouts.Services;

namespace api.Domain.WorkoutExercises.Services;

public class WorkoutExercisesService(
  IRepository<WorkoutExercise> workoutExerciseRepository,
  IWorkoutExerciseMapper workoutExcerciseMapper,
  IWorkoutService workoutService,
  IExerciseService exerciseService,
  ISetService setService,
  ISetMapper setMapper
) : IWorkoutExercisesService
{
  private readonly IRepository<WorkoutExercise> _workoutExerciseRepository = workoutExerciseRepository;
  private readonly IWorkoutExerciseMapper _workoutExercisesMapper = workoutExcerciseMapper;
  private readonly ISetService _setService = setService;
  private readonly ISetMapper _setMapper = setMapper;
  private readonly IWorkoutService _workoutService = workoutService;
  private readonly IExerciseService _exerciseService = exerciseService;

  public async Task<bool> Delete(Guid guid)
  {
    return await _workoutExerciseRepository.Delete(guid);
  }

  public async Task<WorkoutExerciseResponseDto?> Put(Guid workoutExerciseId, WorkoutExerciseUpdateDto dto)
  {
    var workoutExercise = await _workoutExerciseRepository.GetById(workoutExerciseId);
    if (workoutExercise is null) return null;

    var updatedWorkoutExercise = _workoutExercisesMapper.PutMap(workoutExercise, dto);
    if (updatedWorkoutExercise is null) return null;

    if (dto.Exercise.Sets is not null)
    {
      await _setService.Update(workoutExerciseId, dto.Exercise.Sets);
    }

    var result = await _workoutExerciseRepository.Update(updatedWorkoutExercise);

    return _workoutExercisesMapper.ResponseMap(result);
  }

  public async Task<WorkoutExerciseResponseDto> Post(WorkoutExerciseDto dto)
  {
    var newWorkoutExercise = new WorkoutExercise
    {
      ExerciseId = dto.Exercise.ExerciseId,
      WorkoutId = dto.Workout.WorkoutId,
      Order = 1,
    };

    if (dto.Exercise.Sets is not null)
      newWorkoutExercise.Sets = [.. _setMapper.Map(dto.Exercise.Sets)];

    var createdWorkoutExercise = await _workoutExerciseRepository.Add(newWorkoutExercise);
    var workout = await _workoutService.GetById(createdWorkoutExercise.WorkoutId);
    var exercise = await _exerciseService.GetById(createdWorkoutExercise.ExerciseId);

    var result = new WorkoutExerciseResponseDto
    {
      Exercise = new WorkoutExerciseResponseDto.ExerciseDto
      {
        ExerciseId = exercise.ExerciseId,
        Name = exercise.Name
      },
      Workout = new WorkoutExerciseResponseDto.WorkoutDto
      {
        WorkoutId = workout.WorkoutId,
        Name = workout.Name,
      },
      Order = createdWorkoutExercise.Order,
      WorkoutExerciseId = createdWorkoutExercise.WorkoutExerciseId
    };

    return result;
  }

  public async Task<IEnumerable<WorkoutExerciseResponseDto>> GetByWorkoutId(Guid workoutId)
  {
    return await _workoutExerciseRepository.Get(
      select: we => _workoutExercisesMapper.ResponseMap(we),
      filter: we => we.WorkoutId == workoutId
    );
  }
}
