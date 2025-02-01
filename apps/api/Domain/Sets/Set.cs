using System.ComponentModel.DataAnnotations;
using api.Domain.WorkoutExercises;

namespace api.Domain.Sets;

public class Set
{
  [Key]
  public Guid SetId { get; set; }

  public required Guid WorkoutExerciseId { get; set; }

  public required int Reps { get; set; }

  public required int Rir { get; set; }

  public virtual WorkoutExercise? WorkoutExercise { get; set; }
}
