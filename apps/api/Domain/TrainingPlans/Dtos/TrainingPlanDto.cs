using System.ComponentModel.DataAnnotations;

namespace api.Domain.TrainingPlans.Dtos;

public class TrainingPlanDto
{
  [MaxLength(50)]
  public required string Name { get; set; }

  [MaxLength(150)]
  public string? Description { get; set; }

  public required byte Weeks { get; set; }
}
