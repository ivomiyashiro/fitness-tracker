using Mapster;
using api.Domain.Sets.Dtos;

namespace api.Domain.Sets.Mappers;

public class SetMapper : ISetMapper
{
  public IEnumerable<Set> Map(IEnumerable<SetDto> setsDto)
  {
    return setsDto.Select(setDto => setDto.Adapt<Set>());
  }

  public IEnumerable<Set> Map(IEnumerable<SetResponseDto> setsDto)
  {
    return setsDto.Select(setDto => setDto.Adapt<Set>());
  }

  public IEnumerable<SetResponseDto> ResponseMap(IEnumerable<Set> sets)
  {
    return sets.Select(set => set.Adapt<SetResponseDto>());
  }
}
