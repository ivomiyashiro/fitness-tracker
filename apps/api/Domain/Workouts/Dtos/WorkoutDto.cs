using api.Domain.Excercises.Dtos;

namespace api.Domain.Workouts.Dtos;

public class WorkoutDto
{
  public required Guid TrainingPlanId { get; set; }

  public required string Name { get; set; }

  public IEnumerable<ExcerciseResponseDto> Excercises { get; set; } = new List<ExcerciseResponseDto>();
}
