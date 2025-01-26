using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class Add_TraininPlanDays : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TrainingPlanDay_TrainingPlanWeeks_TrainingPlanWeekId",
                table: "TrainingPlanDay");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TrainingPlanDay",
                table: "TrainingPlanDay");

            migrationBuilder.RenameTable(
                name: "TrainingPlanDay",
                newName: "TrainingPlanDays");

            migrationBuilder.RenameIndex(
                name: "IX_TrainingPlanDay_TrainingPlanWeekId",
                table: "TrainingPlanDays",
                newName: "IX_TrainingPlanDays_TrainingPlanWeekId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TrainingPlanDays",
                table: "TrainingPlanDays",
                column: "TrainingPlanDayId");

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingPlanDays_TrainingPlanWeeks_TrainingPlanWeekId",
                table: "TrainingPlanDays",
                column: "TrainingPlanWeekId",
                principalTable: "TrainingPlanWeeks",
                principalColumn: "TrainingPlanWeekId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TrainingPlanDays_TrainingPlanWeeks_TrainingPlanWeekId",
                table: "TrainingPlanDays");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TrainingPlanDays",
                table: "TrainingPlanDays");

            migrationBuilder.RenameTable(
                name: "TrainingPlanDays",
                newName: "TrainingPlanDay");

            migrationBuilder.RenameIndex(
                name: "IX_TrainingPlanDays_TrainingPlanWeekId",
                table: "TrainingPlanDay",
                newName: "IX_TrainingPlanDay_TrainingPlanWeekId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TrainingPlanDay",
                table: "TrainingPlanDay",
                column: "TrainingPlanDayId");

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingPlanDay_TrainingPlanWeeks_TrainingPlanWeekId",
                table: "TrainingPlanDay",
                column: "TrainingPlanWeekId",
                principalTable: "TrainingPlanWeeks",
                principalColumn: "TrainingPlanWeekId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
