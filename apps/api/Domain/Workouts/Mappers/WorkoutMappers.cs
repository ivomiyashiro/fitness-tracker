using api.Domain.Excercises.Dtos;
using api.Domain.Workouts.Dtos;

namespace api.Domain.Workouts.Mappers;

public class WorkoutMappers : IWorkoutMappers
{
  public WorkoutResponseDto ResponseMap(Workout workout)
  {
    return new WorkoutResponseDto
    {
      Name = workout.Name,
      WorkoutId = workout.WorkoutId,
      Order = workout.Order,
      Excercises = workout.WorkoutExcercises!.Select(workoutEx => new ExcerciseResponseDto
      {
        ExcerciseId = workoutEx.ExcerciseId,
        Name = workoutEx.Excercise!.Name
      })
    };
  }

  public Workout PutMap(Workout workout, WorkoutDto dto)
  {
    workout.Name = dto.Name;

    return workout;
  }
}
