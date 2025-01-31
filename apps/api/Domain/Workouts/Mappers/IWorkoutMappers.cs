using api.Domain.Workouts.Dtos;

namespace api.Domain.Workouts.Mappers;

public interface IWorkoutMappers
{
  WorkoutResponseDto ResponseMap(Workout workout);
  Workout PutMap(Workout workout, WorkoutDto dto);
}
