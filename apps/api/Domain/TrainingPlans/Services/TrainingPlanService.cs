using api.Data;
using api.Domain.TrainingPlans.Dtos;
using api.Domain.TrainingPlans.Mappers;

namespace api.Domain.TrainingPlans.Services;

public class TrainingPlanService(
  IRepository<TrainingPlan> trainingPlanRepository,
  ITrainingPlanMapper trainingPlanMapper
) : ITrainingPlanService
{
  private readonly IRepository<TrainingPlan> _trainingPlanRepository = trainingPlanRepository;
  private readonly ITrainingPlanMapper _trainingPlanMapper = trainingPlanMapper;

  public async Task<IEnumerable<TrainingPlanResponseDto>> Get(int? limit, int? offset, string? search)
  {
    return await _trainingPlanRepository.Get(
        select: x => _trainingPlanMapper.ResponseMap(x),
        limit: limit,
        offset: offset
    );
  }

  public async Task<TrainingPlanResponseDto?> Post(TrainingPlanDto dto)
  {
    var trainingPlan = _trainingPlanMapper.PostMap(dto);
    if (trainingPlan is null) return null;
    var newTrainingPlan = await _trainingPlanRepository.Add(trainingPlan);
    return _trainingPlanMapper.ResponseMap(newTrainingPlan);
  }

  public async Task<TrainingPlanResponseDto?> Put(Guid uid, TrainingPlanDto dto)
  {
    var trainingPlanToUpdate = await _trainingPlanRepository.GetById(uid);
    if (trainingPlanToUpdate is null) return null;

    var updatedTrainingPlan = _trainingPlanMapper.PutMap(trainingPlanToUpdate, dto);
    if (updatedTrainingPlan is null) return null;

    var result = await _trainingPlanRepository.Update(updatedTrainingPlan);
    if (result is null) return null;

    return _trainingPlanMapper.ResponseMap(result);
  }

  public async Task<bool> Delete(Guid uid)
  {
    var trainingPlanToDelete = await _trainingPlanRepository.GetById(uid);
    if (trainingPlanToDelete is null) return false;

    return await _trainingPlanRepository.Delete(uid);
  }
}
