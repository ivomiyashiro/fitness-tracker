using api.Data;
using api.Domain.Excercises;
using api.Domain.TrainingPlans;
using api.Domain.Workouts;
using api.Helpers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCustomCors(builder.Configuration);
builder.Services.AddDbContext<AppDbContext>();
builder.Services.AddMappers();
builder.Services.AddRepositories();
builder.Services.AddServices();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseCors("AllowWebApp");
app.UseHttpsRedirection();

// Enpoints
app.MapExcerciseEndpoints();
app.MapTrainingPlanEndpoints();
app.MapWorkoutEndpoints();

app.Run();