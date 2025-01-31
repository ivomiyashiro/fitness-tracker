using api.Domain.Excercises.Dtos;

namespace api.Domain.Excercises.Services;

public interface IExcerciseService
{
  Task<IEnumerable<ExcerciseResponseDto>> Get(int? limit, int? offset, string? search);
  Task<Excercise?> Post(ExcerciseDto dto);
}
