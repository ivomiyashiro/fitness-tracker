using api.Data;
using api.Domain.Sets.Dtos;
using api.Domain.Sets.Mappers;

namespace api.Domain.Sets.Services;

public class SetService(
  IRepository<Set> setRepository,
  ISetMapper setMapper
) : ISetService
{
  private readonly IRepository<Set> _setRepository = setRepository;
  private readonly ISetMapper _setMapper = setMapper;

  public async Task<IEnumerable<SetResponseDto>> Update(Guid workoutExerciseId, IEnumerable<SetResponseDto> sets)
  {
    var setsEntities = sets.Where(set => set.SetId).Select(set => new Set
    {
      SetId = set.SetId,
      Reps = set.Reps,
      WorkoutExerciseId = workoutExerciseId,
      Rir = set.Rir,
    });

    await _setRepository.Update(setsEntities);

    return _setMapper.ResponseMap(setsEntities);
  }
}
