using api.Data;
using api.Domain.Excercises.Dtos;
using Microsoft.IdentityModel.Tokens;

namespace api.Domain.Excercises.Services;

public class ExcerciseService(
  IRepository<Excercise> excerciseRepository
) : IExcerciseService
{
  private readonly IRepository<Excercise> _excerciseRepository = excerciseRepository;

  public async Task<IEnumerable<ExcerciseResponseDto>> Get(int? limit, int? offset, string? search)
  {
    return await _excerciseRepository.Get(
      select: e => new ExcerciseResponseDto
      {
        ExcerciseId = e.ExcerciseId,
        Name = e.Name
      },
      filter: search.IsNullOrEmpty() ? null : e => e.Name.Contains(search!),
      limit: limit,
      offset: offset
    );
  }

  public Task<Excercise?> Post(ExcerciseDto dto)
  {
    throw new NotImplementedException();
  }
}
