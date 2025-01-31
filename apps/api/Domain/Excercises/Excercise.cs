using System.ComponentModel.DataAnnotations;

namespace api.Domain.Excercises;

public class Excercise
{
  [Key]
  public Guid ExcerciseId { get; set; }

  public required string Name { get; set; }
}
