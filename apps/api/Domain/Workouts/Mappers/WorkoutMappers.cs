using api.Domain.Exercises.Dtos;
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
      Exercises = workout.WorkoutExercises!.Select(workoutEx => new ExerciseResponseDto
      {
        ExerciseId = workoutEx.ExerciseId,
        Name = workoutEx.Exercise!.Name
      })
    };
  }

  public Workout PutMap(Workout workout, WorkoutDto dto)
  {
    workout.Name = dto.Name;

    return workout;
  }
}
