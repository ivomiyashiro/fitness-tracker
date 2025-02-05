using api.Domain.Sets.Dtos;

namespace api.Domain.Sets.Mappers;

public interface ISetMapper
{
  IEnumerable<Set> Map(IEnumerable<SetDto> dto);
  IEnumerable<Set> Map(IEnumerable<SetResponseDto> dto);
  IEnumerable<SetResponseDto> ResponseMap(IEnumerable<Set> set);
}
