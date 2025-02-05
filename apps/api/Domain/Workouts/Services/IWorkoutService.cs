using api.Domain.Workouts.Dtos;

namespace api.Domain.Workouts.Services;

public interface IWorkoutService
{
  Task<bool> Delete(Guid guid);
  Task<IEnumerable<WorkoutResponseDto?>> GetByTraininPlanId(Guid trainingPlanId);
  Task<IEnumerable<WorkoutResponseDto>> Get(int? limit, int? offset, string? search);
  Task<WorkoutResponseDto?> Post(WorkoutDto dto);
  Task<WorkoutResponseDto?> Put(Guid guid1uid, WorkoutDto dto);
  Task<WorkoutResponseDto?> GetById(Guid guid);
}
