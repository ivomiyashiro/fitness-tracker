using api.Data;
using api.Domain.TrainingPlans;
using api.Domain.TrainingPlans.Mappers;
using api.Domain.TrainingPlans.Services;

var builder = WebApplication.CreateBuilder(args);

// CORS Configuration
builder.Services.AddCors(options =>
{
    var allowedOrigins = builder.Configuration.GetSection("AllowedHosts").Get<string[]>() ?? ["*"];

    options.AddPolicy("AllowWebApp", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
builder.Services.AddDbContext<DatabaseContext>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IRepository<TrainingPlan>, DataAccess<TrainingPlan>>();
builder.Services.AddScoped<ITrainingPlanService, TrainingPlanService>();
builder.Services.AddScoped<ITrainingPlanMappers, TrainingPlanMappers>();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowWebApp");

app.MapTrainingPlanEndpoints();

app.Run();