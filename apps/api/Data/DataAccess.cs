using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class DataAccess<T>(DatabaseContext context) : IRepository<T> where T : class
{
    private readonly DatabaseContext _context = context;

    public async Task<IEnumerable<T>> GetAll(int? limit = null, int? offset = null, Expression<Func<T, bool>>? filter = null)
    {
        IQueryable<T> query = _context.Set<T>();

        if (filter is not null)
        {
            query = query.Where(filter);
        }

        if (offset.HasValue)
        {
            query = query.Skip(offset.Value);
        }

        if (limit.HasValue)
        {
            query = query.Take(limit.Value);
        }

        return await query.ToListAsync();
    }

    public async Task<T?> GetById(Guid id)
    {
        return await _context.Set<T>().FindAsync(id);
    }

    public async Task<T> Add(T entity)
    {
        await _context.Set<T>().AddAsync(entity);
        await _context.SaveChangesAsync();

        return entity;
    }

    public async Task<T> Update(T entity)
    {
        _context.Set<T>().Update(entity);
        await _context.SaveChangesAsync();

        return entity;
    }

    public async Task<bool> Delete(Guid id)
    {
        var entity = await GetById(id);
        if (entity != null)
        {
            _context.Set<T>().Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        return false;
    }
}

