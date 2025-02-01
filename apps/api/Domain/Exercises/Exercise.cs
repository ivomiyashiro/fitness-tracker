using System.ComponentModel.DataAnnotations;

namespace api.Domain.Exercises;

public class Exercise
{
  [Key]
  public Guid ExerciseId { get; set; }

  public required string Name { get; set; }
}
