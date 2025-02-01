using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using api.Domain.Exercises;
using api.Domain.Sets;
using api.Domain.TrainingPlans;
using api.Domain.WorkoutExercises;
using api.Domain.Workouts;
using api.Utils.Dtos;

namespace api.Data;

public class AppDbContext(IConfiguration config) : DbContext
{
    public IConfiguration _config { get; set; } = config;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder
            .UseSqlServer(_config.GetConnectionString("DatabaseConnection"))
            .UseAsyncSeeding(async (context, _, ct) =>
                {
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "seed.json");

                    if (!File.Exists(filePath)) return;

                    var jsonData = await File.ReadAllTextAsync(filePath, ct);
                    var dataToSeed = JsonSerializer.Deserialize<SeedDto>(jsonData);

                    if (dataToSeed is null) return;
                    if (!dataToSeed.Exercises.Any()) return;

                    var exercisesToSeed = dataToSeed.Exercises.Select(x => new Exercise() { Name = x.Name });

                    var contains = await context.Set<Exercise>().ContainsAsync(exercisesToSeed.First(), cancellationToken: ct);

                    if (contains) return;

                    await context.Set<Exercise>().AddRangeAsync(exercisesToSeed, ct);
                    await context.SaveChangesAsync(ct);

                }
            );
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            var navigationProperties = entityType.GetNavigations();

            foreach (var navigation in navigationProperties)
            {
                modelBuilder.Entity(entityType.ClrType)
                    .Navigation(navigation.Name)
                    .AutoInclude();
            }
        }

        base.OnModelCreating(modelBuilder);
    }

    public DbSet<Exercise> Exercises { get; set; }
    public DbSet<Set> Sets { get; set; }
    public DbSet<TrainingPlan> TrainingPlans { get; set; }
    public DbSet<Workout> Workouts { get; set; }
    public DbSet<WorkoutExercise> WorkoutExercises { get; set; }
}