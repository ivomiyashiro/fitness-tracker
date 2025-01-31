using api.Domain.Excercises.Dtos;
using api.Domain.Excercises.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Domain.Excercises;

public static class ExcerciseEndpoints
{
  public static void MapExcerciseEndpoints(this WebApplication app)
  {
    var group = app.MapGroup("excercises").WithTags("Excercises");

    group.MapGet("/", async (
      IExcerciseService _excerciseService,
      [FromQuery] int? limit = null,
      [FromQuery] int? offset = null,
      [FromQuery] string? search = ""
    ) =>
    {
      var trainingPlan = await _excerciseService.Get(limit, offset, search);
      return Results.Ok(trainingPlan);
    })
    .Produces<IEnumerable<ExcerciseResponseDto>>();
  }
}
