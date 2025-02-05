using api.Domain.Exercises.Dtos;

namespace api.Domain.Exercises.Services;

public interface IExerciseService
{
  Task<IEnumerable<ExerciseResponseDto>> Get(int? limit, int? offset, string? search);
  Task<Exercise?> Post(ExerciseDto dto);
  Task<ExerciseResponseDto?> GetById(Guid guid);
}
