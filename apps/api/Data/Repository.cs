using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class Repository<T>(AppDbContext context) : IRepository<T> where T : class
{
  private readonly AppDbContext _context = context;

  public async Task<IEnumerable<TResult>> Get<TResult>(
      Expression<Func<T, TResult>>? select = null,
      Expression<Func<T, bool>>? filter = null,
      Expression<Func<T, object>>? orderBy = null,
      bool isAscending = true,
      int? limit = null,
      int? offset = null
  )
  {
    IQueryable<T> query = _context.Set<T>();

    if (filter is not null)
    {
      query = query.Where(filter);
    }

    if (orderBy is not null)
    {
      query = isAscending ? query.OrderBy(orderBy) : query.OrderByDescending(orderBy);
    }

    if (offset.HasValue)
    {
      query = query.Skip(offset.Value);
    }

    if (limit.HasValue)
    {
      query = query.Take(limit.Value);
    }

    IQueryable<TResult> resultQuery;
    if (select is not null)
    {
      resultQuery = query.Select(select);
    }
    else
    {
      resultQuery = query.Cast<TResult>();
    }

    var result = await resultQuery.ToListAsync();

    return result;
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

  public async Task<IEnumerable<T>> Add(IEnumerable<T> entities)
  {
    await _context.Set<T>().AddRangeAsync(entities);
    await _context.SaveChangesAsync();

    return entities;
  }

  public async Task<T> Update(T entity)
  {
    _context.Set<T>().Update(entity);
    await _context.SaveChangesAsync();

    return entity;
  }

  public async Task<IEnumerable<T>> Update(IEnumerable<T> entities)
  {
    _context.Set<T>().UpdateRange(entities);
    await _context.SaveChangesAsync();

    return entities;
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
