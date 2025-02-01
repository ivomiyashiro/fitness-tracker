using Microsoft.AspNetCore.Mvc;
using api.Domain.TrainingPlans.Services;
using api.Domain.TrainingPlans.Dtos;
using api.Domain.Workouts.Services;
using api.Domain.Workouts.Dtos;
using api.Utils.Dtos;

namespace api.Domain.TrainingPlans;

public static class TrainingPlanEndpoints
{
  public static void MapTrainingPlanEndpoints(this WebApplication app)
  {
    var group = app.MapGroup("training-plans").WithTags("Training Plans");

    group.MapGet("/", async (
      ITrainingPlanService _trainingPlanService,
      [FromQuery] int? limit = null,
      [FromQuery] int? offset = null,
      [FromQuery] string? search = ""
    ) =>
    {
      var result = await _trainingPlanService.Get(limit, offset, search);
      return Results.Ok(result);
    })
    .Produces<IEnumerable<TrainingPlanResponseDto>>();

    group.MapPost("/", async (
      ITrainingPlanService _trainingPlanService,
      [FromBody] TrainingPlanDto dto
    ) =>
    {
      var result = await _trainingPlanService.Post(dto);
      return Results.Created("/traning-plans", result);
    })
    .Produces<TrainingPlanResponseDto>();

    group.MapPut("/{uid}", async (
      ITrainingPlanService _trainingPlanService,
      Guid uid,
      [FromBody] TrainingPlanDto dto
    ) =>
    {
      var result = await _trainingPlanService.Put(uid, dto);

      if (result is null)
        return Results.NotFound();

      return Results.Ok(result);
    })
    .Produces<TrainingPlanResponseDto>();

    group.MapDelete("/{uid}", async (
      ITrainingPlanService _trainingPlanService,
      Guid uid
    ) =>
    {
      var result = await _trainingPlanService.Delete(uid);

      if (result is false)
        return Results.NotFound();

      return Results.Ok(new { Deleted = result });
    })
    .Produces<DeletedResponseDto>();

    group.MapGet("/{uid}/workouts", async (
      IWorkoutService _workoutService,
      Guid uid
    ) =>
    {
      var result = await _workoutService.GetByTraininPlanId(uid);

      return Results.Ok(result);
    })
    .Produces<IEnumerable<WorkoutResponseDto>>();
  }
}
