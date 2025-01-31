using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using api.Domain.WorkoutExcercises;

namespace api.Domain.Sets;

public class Set
{
  [Key]
  public Guid SetId { get; set; }

  public required Guid WorkoutExcerciseId { get; set; }

  public required int Reps { get; set; }

  public required int Rir { get; set; }

  [JsonIgnore]
  public virtual WorkoutExcercise? WorkoutExcercise { get; set; }
}
