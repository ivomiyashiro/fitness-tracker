namespace api.Domain.Excercises.Dtos;

public class ExcerciseResponseDto
{
  public required Guid ExcerciseId { get; set; }

  public required string Name { get; set; }
}
