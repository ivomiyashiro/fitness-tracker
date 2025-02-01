using api.Domain.Exercises.Dtos;

namespace api.Domain.Workouts.Dtos;

public class WorkoutResponseDto
{
  public required Guid WorkoutId { get; set; }

  public required string Name { get; set; }

  public byte Order { get; set; }

  public IEnumerable<ExerciseResponseDto> Exercises { get; set; } = new List<ExerciseResponseDto>();
}
