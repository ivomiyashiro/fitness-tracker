using System.ComponentModel.DataAnnotations;
using api.Domain.Exercises;
using api.Domain.Sets;
using api.Domain.Workouts;

namespace api.Domain.WorkoutExercises;

public class WorkoutExercise
{
  [Key]
  public Guid WorkoutExerciseId { get; set; }

  public required Guid WorkoutId { get; set; }

  public required Guid ExerciseId { get; set; }

  public required byte Order { get; set; }

  public virtual Workout? Workout { get; set; }

  public virtual Exercise? Exercise { get; set; }

  public virtual ICollection<Set> Sets { get; set; } = new HashSet<Set>();
}
