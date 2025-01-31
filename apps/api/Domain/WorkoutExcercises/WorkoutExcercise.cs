using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using api.Domain.Excercises;
using api.Domain.Sets;
using api.Domain.Workouts;

namespace api.Domain.WorkoutExcercises;

public class WorkoutExcercise
{
  [Key]
  public Guid WorkoutExcerciseId { get; set; }

  public required Guid WorkoutId { get; set; }

  public required Guid ExcerciseId { get; set; }

  public required byte Order { get; set; }

  public virtual Workout? Workout { get; set; }

  public virtual Excercise? Excercise { get; set; }

  [JsonIgnore]
  public virtual IEnumerable<Set>? Sets { get; set; }
}
