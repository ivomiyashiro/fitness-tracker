using api.Data;
using api.Domain.Exercises.Dtos;
using Microsoft.IdentityModel.Tokens;

namespace api.Domain.Exercises.Services;

public class ExerciseService(
  IRepository<Exercise> exerciseRepository
) : IExerciseService
{
  private readonly IRepository<Exercise> _exerciseRepository = exerciseRepository;

  public async Task<IEnumerable<ExerciseResponseDto>> Get(int? limit, int? offset, string? search)
  {
    return await _exerciseRepository.Get(
      select: e => new ExerciseResponseDto
      {
        ExerciseId = e.ExerciseId,
        Name = e.Name
      },
      filter: search.IsNullOrEmpty() ? null : e => e.Name.Contains(search!),
      limit: limit,
      offset: offset
    );
  }

  public async Task<ExerciseResponseDto?> GetById(Guid guid)
  {
    var result = await _exerciseRepository.GetById(guid);
    if (result == null) return null;
    return new ExerciseResponseDto
    {
      ExerciseId = result.ExerciseId,
      Name = result.Name,
    };
  }

  public Task<Exercise?> Post(ExerciseDto dto)
  {
    throw new NotImplementedException();
  }
}
