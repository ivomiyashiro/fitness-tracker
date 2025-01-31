using api.Domain.Workouts;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace api.Domain.TrainingPlans;

[Index(nameof(Name), IsUnique = true)]
public class TrainingPlan
{
  [Key]
  public Guid TrainingPlanId { get; set; }

  public required string Name { get; set; }

  public string? Description { get; set; }

  public required byte Weeks { get; set; }

  [JsonIgnore]
  public virtual IEnumerable<Workout>? Workouts { get; set; }
}
