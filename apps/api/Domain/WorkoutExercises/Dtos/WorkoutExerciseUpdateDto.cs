using api.Domain.Sets.Dtos;

namespace api.Domain.WorkoutExercises.Dtos;

public class WorkoutExerciseUpdateDto
{
  public required WorkoutDto Workout { get; set; }

  public required ExerciseDto Exercise { get; set; }

  public byte? Order { get; set; }

  public class ExerciseDto
  {
    public required Guid ExerciseId { get; set; }

    public string? Name { get; set; }

    public required IEnumerable<SetResponseDto> Sets { get; set; }
  }

  public class WorkoutDto
  {
    public required Guid WorkoutId { get; set; }

    public string? Name { get; set; }
  }
}
