using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class Remove_Weeks_And_Days : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TrainingPlanDays");

            migrationBuilder.DropTable(
                name: "TrainingPlanWeeks");

            migrationBuilder.AddColumn<byte>(
                name: "Weeks",
                table: "TrainingPlans",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Weeks",
                table: "TrainingPlans");

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
                name: "TrainingPlanDays",
                columns: table => new
                {
                    TrainingPlanDayId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TrainingPlanWeekId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DayOfWeek = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingPlanDays", x => x.TrainingPlanDayId);
                    table.ForeignKey(
                        name: "FK_TrainingPlanDays_TrainingPlanWeeks_TrainingPlanWeekId",
                        column: x => x.TrainingPlanWeekId,
                        principalTable: "TrainingPlanWeeks",
                        principalColumn: "TrainingPlanWeekId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TrainingPlanDays_TrainingPlanWeekId",
                table: "TrainingPlanDays",
                column: "TrainingPlanWeekId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingPlanWeeks_TrainingPlanId",
                table: "TrainingPlanWeeks",
                column: "TrainingPlanId");
        }
    }
}
