using System.Text.Json;
using Microsoft.AspNetCore.Diagnostics;

using api.Utils;

public static class AppExceptionHandler
{
  public static void UseAppExceptionHandler(this WebApplication app)
  {
    app.UseExceptionHandler(appError =>
    {
      appError.Run(async context =>
          {
            context.Response.StatusCode = 500;
            context.Response.ContentType = "application/json";

            var contextFeature = context.Features.Get<IExceptionHandlerFeature>();

            if (contextFeature is null) return;

            var response = new
            {
              StatusCode = context.Response.StatusCode,
              Message = "Internal Server Error"
            };

            var options = new JsonSerializerOptions
            {
              PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
              WriteIndented = false,
              DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull
            };

            await context.Response.WriteAsJsonAsync(response, options);
          });
    });
  }
}
