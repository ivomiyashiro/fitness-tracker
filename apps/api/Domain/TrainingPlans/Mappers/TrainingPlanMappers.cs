using Mapster;
using api.Domain.TrainingPlans.Dtos;

namespace api.Domain.TrainingPlans.Mappers;

public class TrainingPlanMappers : ITrainingPlanMappers
{
    public TrainingPlan PostMap(TrainingPlanBody body)
    {
        return body.Adapt<TrainingPlan>();
    }

    public TrainingPlan PutMap(TrainingPlan trainingPlan, TrainingPlanBody body)
    {
        trainingPlan.Name = body.Name;
        trainingPlan.Description = body.Description;
        trainingPlan.Weeks = body.Weeks;

        return trainingPlan;
    }
}
