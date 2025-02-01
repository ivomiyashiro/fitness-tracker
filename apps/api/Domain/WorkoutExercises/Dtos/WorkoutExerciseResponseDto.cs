namespace api.Domain.WorkoutExercises.Dtos;

public class WorkoutExerciseResponseDto
{
  public required Guid WorkoutExerciseId { get; set; }

  public required byte Order { get; set; }

  public WorkoutDto? Workout { get; set; }

  public ExerciseDto? Exercise { get; set; }

  public class ExerciseDto
  {
    public required Guid ExerciseId { get; set; }

    public required string Name { get; set; }
  }

  public class WorkoutDto
  {
    public required Guid WorkoutId { get; set; }

    public required string Name { get; set; }
  }

}
