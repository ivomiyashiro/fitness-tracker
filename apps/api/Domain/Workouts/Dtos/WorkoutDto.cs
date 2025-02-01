using api.Domain.Exercises.Dtos;

namespace api.Domain.Workouts.Dtos;

public class WorkoutDto
{
  public required Guid TrainingPlanId { get; set; }

  public required string Name { get; set; }

  public IEnumerable<ExerciseResponseDto> Exercises { get; set; } = new List<ExerciseResponseDto>();
}
