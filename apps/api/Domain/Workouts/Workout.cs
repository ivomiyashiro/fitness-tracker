using System.ComponentModel.DataAnnotations;
using api.Domain.TrainingPlans;
using api.Domain.WorkoutExercises;

namespace api.Domain.Workouts;

public class Workout
{
  [Key]
  public Guid WorkoutId { get; set; }

  public required Guid TrainingPlanId { get; set; }

  public required string Name { get; set; }

  public required byte Order { get; set; }

  public virtual TrainingPlan? TrainingPlan { get; set; }

  public virtual ICollection<WorkoutExercise> WorkoutExercises { get; set; } = new HashSet<WorkoutExercise>();
}
