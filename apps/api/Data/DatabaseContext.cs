using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class DatabaseContext(DbContextOptions<DatabaseContext> options) : DbContext(options)
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {}

    // Examples
    // public DbSet<Todo> Todos { get; set; }
}