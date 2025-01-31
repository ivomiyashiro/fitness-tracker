using System.Linq.Expressions;

namespace api.Data;

public interface IRepository<T> where T : class
{
  Task<IEnumerable<TResult>> Get<TResult>(
      Expression<Func<T, TResult>>? select = null,  // Hacer select nullable
      Expression<Func<T, bool>>? filter = null,
      Expression<Func<T, object>>? orderBy = null,
      bool isAscending = true,
      int? limit = null,
      int? offset = null
  );
  Task<T?> GetById(Guid id);
  Task<T> Add(T entity);
  Task<IEnumerable<T>> Add(IEnumerable<T> entities);
  Task<T> Update(T entity);
  Task<bool> Delete(Guid id);
}
