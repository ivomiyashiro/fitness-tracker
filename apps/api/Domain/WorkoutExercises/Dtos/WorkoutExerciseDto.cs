using api.Domain.Sets.Dtos;

namespace api.Domain.WorkoutExercises.Dtos;

public class WorkoutExerciseDto
{
  public required WorkoutDto Workout { get; set; }

  public required ExerciseDto Exercise { get; set; }

  public byte? Order { get; set; }

  public class ExerciseDto
  {
    public required Guid ExerciseId { get; set; }

    public required string Name { get; set; }

    public IEnumerable<SetResponseDto>? Sets { get; set; }
  }

  public class WorkoutDto
  {
    public required Guid WorkoutId { get; set; }

    public required string Name { get; set; }
  }
}
