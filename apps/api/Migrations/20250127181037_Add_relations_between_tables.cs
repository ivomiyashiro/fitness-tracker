using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class Add_relations_between_tables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Sets_WorkoutExcerciseId",
                table: "Sets",
                column: "WorkoutExcerciseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sets_WorkoutExcercises_WorkoutExcerciseId",
                table: "Sets",
                column: "WorkoutExcerciseId",
                principalTable: "WorkoutExcercises",
                principalColumn: "WorkoutExcerciseId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sets_WorkoutExcercises_WorkoutExcerciseId",
                table: "Sets");

            migrationBuilder.DropIndex(
                name: "IX_Sets_WorkoutExcerciseId",
                table: "Sets");
        }
    }
}
