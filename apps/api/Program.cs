using api.Data;
using api.Domain.Exercises;
using api.Domain.TrainingPlans;
using api.Domain.Workouts;
using api.Utils;
using api.Utils.InversionOfControl;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCustomCors(builder.Configuration);
builder.Services.AddDbContext<AppDbContext>();
builder.Services.AddMappers();
builder.Services.AddRepositories();
builder.Services.AddServices();

var app = builder.Build();


await using (var serviceScope = app.Services.CreateAsyncScope())
await using (var dbContext = serviceScope.ServiceProvider.GetRequiredService<AppDbContext>())
{
  // Ensure the database is created to seed data
  await dbContext.Database.EnsureCreatedAsync();
}

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseCors("AllowWebApp");
app.UseHttpsRedirection();

// Enpoints
app.MapExerciseEndpoints();
app.MapTrainingPlanEndpoints();
app.MapWorkoutEndpoints();

app.Run();