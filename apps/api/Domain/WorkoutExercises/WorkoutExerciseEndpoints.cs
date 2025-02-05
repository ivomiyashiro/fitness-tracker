using Microsoft.AspNetCore.Mvc;
using api.Domain.WorkoutExercises.Dtos;
using api.Domain.WorkoutExercises.Services;
using api.Utils.Dtos;

namespace api.Domain.WorkoutExercises;

public static class WorkoutExerciseEndpoints
{
  public static void MapWorkoutExerciseEndpoints(this WebApplication app)
  {
    var group = app.MapGroup("workout-exercises").WithTags("Workout Exercises");

    group.MapPost("/", async (
      IWorkoutExercisesService _workoutExercisesService,
      [FromBody] WorkoutExerciseDto dto
    ) =>
    {
      var result = await _workoutExercisesService.Post(dto);
      return Results.Created("/workout-exercises", result);
    })
    .Produces<WorkoutExerciseResponseDto>();

    group.MapPut("/{guid}", async (
      IWorkoutExercisesService _workoutExercisesService,
      Guid guid,
      [FromBody] WorkoutExerciseUpdateDto dto
    ) =>
    {
      var result = await _workoutExercisesService.Put(guid, dto);

      if (result is null)
        return Results.NotFound();

      return Results.Ok(result);
    })
    .Produces<WorkoutExerciseResponseDto>();

    group.MapDelete("/{guid}", async (
      IWorkoutExercisesService _workoutExercisesService,
      Guid guid
    ) =>
    {
      var result = await _workoutExercisesService.Delete(guid);

      if (result is false)
        return Results.NotFound();

      return Results.Ok(new { Deleted = result });
    })
    .Produces<DeletedResponseDto>();
  }
}
