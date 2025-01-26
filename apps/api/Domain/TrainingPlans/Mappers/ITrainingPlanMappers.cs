using api.Domain.TrainingPlans.Dtos;

namespace api.Domain.TrainingPlans.Mappers;

public interface ITrainingPlanMappers
{
    public TrainingPlan PostMap(TrainingPlanBody body);
    public TrainingPlan PutMap(TrainingPlan trainingPlan, TrainingPlanBody body);
}
