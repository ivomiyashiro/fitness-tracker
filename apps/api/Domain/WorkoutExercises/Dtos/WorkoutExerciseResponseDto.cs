namespace api.Domain.WorkoutExercises.Dtos;

public class WorkoutExerciseResponseDto
{
  public Guid WorkoutExerciseId { get; set; }

  public required byte Order { get; set; }

  public required WorkoutDto Workout { get; set; }

  public required ExerciseDto? Exercise { get; set; }

  public class ExerciseDto
  {
    public Guid ExerciseId { get; set; }

    public required string Name { get; set; }
  }

  public class WorkoutDto
  {
    public Guid WorkoutId { get; set; }

    public required string Name { get; set; }
  }

}
