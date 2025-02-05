using api.Domain.Sets.Dtos;

namespace api.Domain.Sets.Services;

public interface ISetService
{
  Task<IEnumerable<SetResponseDto>> Update(Guid workoutExerciseId, IEnumerable<SetResponseDto> sets);
}
