using api.Domain.TrainingPlans;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class DatabaseContext(IConfiguration config) : DbContext
{
    public IConfiguration _config { get; set; } = config;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_config.GetConnectionString("DatabaseConnection"));
    }

    public DbSet<TrainingPlan> TrainingPlans { get; set; }
}