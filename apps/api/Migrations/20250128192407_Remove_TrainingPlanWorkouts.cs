using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class Remove_TrainingPlanWorkouts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TrainingPlanWorkouts");

            migrationBuilder.AddColumn<byte>(
                name: "Order",
                table: "Workouts",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);

            migrationBuilder.AddColumn<Guid>(
                name: "TrainingPlanId",
                table: "Workouts",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Workouts_TrainingPlanId",
                table: "Workouts",
                column: "TrainingPlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_Workouts_TrainingPlans_TrainingPlanId",
                table: "Workouts",
                column: "TrainingPlanId",
                principalTable: "TrainingPlans",
                principalColumn: "TrainingPlanId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workouts_TrainingPlans_TrainingPlanId",
                table: "Workouts");

            migrationBuilder.DropIndex(
                name: "IX_Workouts_TrainingPlanId",
                table: "Workouts");

            migrationBuilder.DropColumn(
                name: "Order",
                table: "Workouts");

            migrationBuilder.DropColumn(
                name: "TrainingPlanId",
                table: "Workouts");

            migrationBuilder.CreateTable(
                name: "TrainingPlanWorkouts",
                columns: table => new
                {
                    TrainingPlanWorkoutId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TrainingPlanId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    WorkoutId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Order = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingPlanWorkouts", x => x.TrainingPlanWorkoutId);
                    table.ForeignKey(
                        name: "FK_TrainingPlanWorkouts_TrainingPlans_TrainingPlanId",
                        column: x => x.TrainingPlanId,
                        principalTable: "TrainingPlans",
                        principalColumn: "TrainingPlanId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TrainingPlanWorkouts_Workouts_WorkoutId",
                        column: x => x.WorkoutId,
                        principalTable: "Workouts",
                        principalColumn: "WorkoutId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TrainingPlanWorkouts_TrainingPlanId",
                table: "TrainingPlanWorkouts",
                column: "TrainingPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingPlanWorkouts_WorkoutId",
                table: "TrainingPlanWorkouts",
                column: "WorkoutId");
        }
    }
}
