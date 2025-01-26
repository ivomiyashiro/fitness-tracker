using api.Data;
using api.Domain.TrainingPlans.Dtos;
using api.Domain.TrainingPlans.Mappers;

namespace api.Domain.TrainingPlans.Services;

public class TrainingPlanService(
  IRepository<TrainingPlan> trainingPlanRepository,
  ITrainingPlanMappers trainingPlanMapper
) : ITrainingPlanService
{
  private readonly IRepository<TrainingPlan> _trainingPlanRepository = trainingPlanRepository;
  private readonly ITrainingPlanMappers _trainingPlanMapper = trainingPlanMapper;

  public async Task<IEnumerable<TrainingPlan>> GetAll(int? limit, int? offset, string? search)
  {
    return await _trainingPlanRepository.GetAll(
        limit,
        offset,
        x => (
          string.IsNullOrEmpty(search) ||
          x.Name.Contains(search) ||
          (x.Description != null && x.Description.Contains(search))
        )
    );
  }

  public async Task<TrainingPlan?> Post(TrainingPlanBody body)
  {
    var trainingPlan = _trainingPlanMapper.PostMap(body);
    if (trainingPlan is null) return null;
    return await _trainingPlanRepository.Add(trainingPlan);
  }

  public async Task<TrainingPlan?> Put(Guid uid, TrainingPlanBody body)
  {
    var trainingPlanToUpdate = await _trainingPlanRepository.GetById(uid);
    if (trainingPlanToUpdate is null) return null;

    var trainingPlan = _trainingPlanMapper.PutMap(trainingPlanToUpdate, body);
    if (trainingPlan is null) return null;
    return await _trainingPlanRepository.Update(trainingPlan);
  }

  public async Task<bool> Delete(Guid uid)
  {
    var trainingPlanToDelete = await _trainingPlanRepository.GetById(uid);
    if (trainingPlanToDelete is null) return false;

    return await _trainingPlanRepository.Delete(uid);
  }
}
