using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace api.Domain.TrainingPlans;

[Index(nameof(Name), IsUnique = true)]
public class TrainingPlan
{
  [Key]
  public required Guid TrainingPlanId { get; set; }

  public required string Name { get; set; }

  public string? Description { get; set; }

  public required byte Weeks { get; set; }
}
