using System.Text.Json.Serialization;

namespace api.Utils.Dtos;

public class SeedDto
{

  [JsonPropertyName("exercises")]
  public IEnumerable<ExerciseDto> Exercises { get; set; } = new HashSet<ExerciseDto>();

  public class ExerciseDto
  {
    [JsonPropertyName("name")]
    public required string Name { get; set; }
  }
}