using Microsoft.EntityFrameworkCore;
using api.Domain.Excercises;
using api.Domain.Sets;
using api.Domain.TrainingPlans;
using api.Domain.WorkoutExcercises;
using api.Domain.Workouts;

namespace api.Data;

public class AppDbContext(IConfiguration config) : DbContext
{
    public IConfiguration _config { get; set; } = config;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_config.GetConnectionString("DatabaseConnection"));
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

    public DbSet<Excercise> Excercises { get; set; }
    public DbSet<Set> Sets { get; set; }
    public DbSet<TrainingPlan> TrainingPlans { get; set; }
    public DbSet<Workout> Workouts { get; set; }
    public DbSet<WorkoutExcercise> WorkoutExcercises { get; set; }
}