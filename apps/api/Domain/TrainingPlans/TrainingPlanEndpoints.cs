using Microsoft.AspNetCore.Mvc;
using api.Domain.TrainingPlans.Services;
using api.Domain.TrainingPlans.Dtos;

namespace api.Domain.TrainingPlans;

public static class TrainingPlanEndpoints
{
  public static void MapTrainingPlanEndpoints(this WebApplication app)
  {
    var group = app.MapGroup("training-plans");

    group.MapGet("/", async (
        ITrainingPlanService _trainingPlanService,
        [FromQuery] int? limit = null,
        [FromQuery] int? offset = null,
        [FromQuery] string? search = ""
    ) =>
    {
      var result = await _trainingPlanService.GetAll(limit, offset, search);
      return Results.Ok(result);
    });

    group.MapPost("/", async (
        ITrainingPlanService _trainingPlanService,
        [FromBody] TrainingPlanBody body
    ) =>
    {
      var result = await _trainingPlanService.Post(body);
      return Results.Created("/traning-plans", result);
    });

    group.MapPut("/{uid}", async (
        ITrainingPlanService _trainingPlanService,
        Guid uid,
        [FromBody] TrainingPlanBody body
    ) =>
    {
      var result = await _trainingPlanService.Put(uid, body);

      if (result is null)
        return Results.NotFound();

      return Results.Ok(result);
    });

    group.MapDelete("/{uid}", async (
        ITrainingPlanService _trainingPlanService,
        Guid uid
    ) =>
    {
      var result = await _trainingPlanService.Delete(uid);

      if (result is false)
        return Results.NotFound();

      return Results.Ok(new { Deleted = result });
    });
  }
}
