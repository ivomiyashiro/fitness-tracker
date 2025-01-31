using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using api.Domain.TrainingPlans;
using api.Domain.WorkoutExcercises;

namespace api.Domain.Workouts;

public class Workout
{
  [Key]
  public Guid WorkoutId { get; set; }

  public required Guid TrainingPlanId { get; set; }

  public required string Name { get; set; }

  public required byte Order { get; set; }

  [JsonIgnore]
  public virtual TrainingPlan? TrainingPlan { get; set; }

  [JsonIgnore]
  public virtual IEnumerable<WorkoutExcercise>? WorkoutExcercises { get; set; }
}
