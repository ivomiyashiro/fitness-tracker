namespace api.Domain.Exercises.Dtos;

public class ExerciseResponseDto
{
  public required Guid ExerciseId { get; set; }

  public required string Name { get; set; }
}
