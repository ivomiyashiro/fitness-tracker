using System.ComponentModel.DataAnnotations;

namespace api.Domain.TrainingPlans.Dtos;

public class TrainingPlanBody
{
  public required string Name { get; set; }

  [MaxLength(100)]
  public string? Description { get; set; }

  public required byte Weeks { get; set; }
}
