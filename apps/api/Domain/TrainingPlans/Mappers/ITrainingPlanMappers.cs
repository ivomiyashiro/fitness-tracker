using api.Domain.TrainingPlans.Dtos;

namespace api.Domain.TrainingPlans.Mappers;

public interface ITrainingPlanMappers
{
    TrainingPlan PostMap(TrainingPlanDto dto);
    TrainingPlan PutMap(TrainingPlan trainingPlan, TrainingPlanDto dto);
    TrainingPlanResponseDto ResponseMap(TrainingPlan trainingPlan);
}
