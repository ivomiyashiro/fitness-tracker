using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class TraininPlanDays_And_TrainingPlanWeeks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "TrainingPlans",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "TrainingPlanWeeks",
                columns: table => new
                {
                    TrainingPlanWeekId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TrainingPlanId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingPlanWeeks", x => x.TrainingPlanWeekId);
                    table.ForeignKey(
                        name: "FK_TrainingPlanWeeks_TrainingPlans_TrainingPlanId",
                        column: x => x.TrainingPlanId,
                        principalTable: "TrainingPlans",
                        principalColumn: "TrainingPlanId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TrainingPlanDay",
                columns: table => new
                {
                    TrainingPlanDayId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TrainingPlanWeekId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DayOfWeek = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingPlanDay", x => x.TrainingPlanDayId);
                    table.ForeignKey(
                        name: "FK_TrainingPlanDay_TrainingPlanWeeks_TrainingPlanWeekId",
                        column: x => x.TrainingPlanWeekId,
                        principalTable: "TrainingPlanWeeks",
                        principalColumn: "TrainingPlanWeekId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TrainingPlanDay_TrainingPlanWeekId",
                table: "TrainingPlanDay",
                column: "TrainingPlanWeekId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingPlanWeeks_TrainingPlanId",
                table: "TrainingPlanWeeks",
                column: "TrainingPlanId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TrainingPlanDay");

            migrationBuilder.DropTable(
                name: "TrainingPlanWeeks");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "TrainingPlans",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
