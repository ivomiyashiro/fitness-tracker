using api.Domain.TrainingPlans.Dtos;

namespace api.Domain.TrainingPlans.Services;

public interface ITrainingPlanService
{
    Task<IEnumerable<TrainingPlanResponseDto>> Get(int? limit, int? offset, string? search);
    Task<TrainingPlanResponseDto?> Post(TrainingPlanDto dto);
    Task<TrainingPlanResponseDto?> Put(Guid uid, TrainingPlanDto dto);
    Task<bool> Delete(Guid uid);
}
