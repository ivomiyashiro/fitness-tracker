using Microsoft.AspNetCore.Mvc;
using api.Domain.Workouts.Dtos;
using api.Domain.Workouts.Services;
using api.Helpers;

namespace api.Domain.Workouts;

public static class WorkoutEndpoints
{
  public static void MapWorkoutEndpoints(this WebApplication app)
  {
    var group = app.MapGroup("workouts").WithTags("Workouts");

    group.MapGet("/", async (
      IWorkoutService _workoutService,
      [FromQuery] int? limit = null,
      [FromQuery] int? offset = null,
      [FromQuery] string? search = ""
    ) =>
    {
      var result = await _workoutService.Get(limit, offset, search);
      return Results.Ok(result);
    })
    .Produces<IEnumerable<WorkoutResponseDto>>();

    group.MapPost("/", async (
      IWorkoutService _workoutService,
      [FromBody] WorkoutDto dto
    ) =>
    {
      var result = await _workoutService.Post(dto);
      return Results.Created("/workouts", result);
    })
    .Produces<WorkoutResponseDto>();

    group.MapPut("/{uid}", async (
      IWorkoutService _workoutService,
      Guid uid,
      [FromBody] WorkoutDto dto
    ) =>
    {
      var result = await _workoutService.Put(uid, dto);
      return Results.Ok(result);
    })
    .Produces<WorkoutResponseDto>();

    group.MapDelete("/{uid}", async (
      IWorkoutService _workoutService,
      Guid uid
    ) =>
    {
      var result = await _workoutService.Delete(uid);

      if (result is false)
        return Results.NotFound();

      return Results.Ok(new { Deleted = result });
    })
    .Produces<DeletedResponseDto>();
  }
}
