namespace api.Domain.Sets.Dtos;

public class SetResponseDto
{
  public Guid SetId { get; set; }

  public required int Reps { get; set; }

  public required int Rir { get; set; }
}
