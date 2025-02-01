using api.Domain.Exercises.Dtos;
using api.Domain.Exercises.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Domain.Exercises;

public static class ExerciseEndpoints
{
  public static void MapExerciseEndpoints(this WebApplication app)
  {
    var group = app.MapGroup("exercises").WithTags("Exercises");

    group.MapGet("/", async (
      IExerciseService _exerciseService,
      [FromQuery] int? limit = null,
      [FromQuery] int? offset = null,
      [FromQuery] string? search = ""
    ) =>
    {
      var trainingPlan = await _exerciseService.Get(limit, offset, search);
      return Results.Ok(trainingPlan);
    })
    .Produces<IEnumerable<ExerciseResponseDto>>();
  }
}
