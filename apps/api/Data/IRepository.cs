using System.Linq.Expressions;

namespace api.Data;

public interface IRepository<T> where T : class
{
    Task<IEnumerable<T>> GetAll(int? limit = null, int? offset = null, Expression<Func<T, bool>>? filter = null);
    Task<T?> GetById(Guid id);
    Task<T> Add(T entity);
    Task<T> Update(T entity);
    Task<bool> Delete(Guid id);
}
