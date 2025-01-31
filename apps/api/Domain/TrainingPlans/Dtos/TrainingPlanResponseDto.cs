using api.Domain.Workouts.Dtos;

namespace api.Domain.TrainingPlans.Dtos;

public class TrainingPlanResponseDto
{
  public required Guid TrainingPlanId { get; set; }

  public required string Name { get; set; }

  public string? Description { get; set; }

  public required byte Weeks { get; set; }

  public required IEnumerable<WorkoutResponseDto> Workouts { get; set; }
}
