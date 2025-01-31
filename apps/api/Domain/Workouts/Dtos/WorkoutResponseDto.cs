using api.Domain.Excercises.Dtos;

namespace api.Domain.Workouts.Dtos;

public class WorkoutResponseDto
{
  public required Guid WorkoutId { get; set; }

  public required string Name { get; set; }

  public byte Order { get; set; }

  public IEnumerable<ExcerciseResponseDto> Excercises { get; set; } = new List<ExcerciseResponseDto>();
}
