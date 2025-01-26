using api.Domain.TrainingPlans.Dtos;

namespace api.Domain.TrainingPlans.Services;

public interface ITrainingPlanService
{
    Task<IEnumerable<TrainingPlan>> GetAll(int? limit, int? offset, string? search);
    Task<TrainingPlan?> Post(TrainingPlanBody body);
    Task<TrainingPlan?> Put(Guid uid, TrainingPlanBody body);
    Task<bool> Delete(Guid uid);
}
