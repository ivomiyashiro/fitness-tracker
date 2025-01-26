using System.ComponentModel.DataAnnotations;

namespace api.Domain.TrainingPlanWorkouts;

public class TrainingPlanWorkout
{
  [Key]
  public required Guid Guid { get; set; }

  public required Guid TrainingPlanId { get; set; }

  public required byte Order { get; set; }
}
