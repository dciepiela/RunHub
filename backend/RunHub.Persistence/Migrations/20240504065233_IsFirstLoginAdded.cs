using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RunHub.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class IsFirstLoginAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3e9a7ab1-8691-4167-b96b-46ea5c0a3402");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3eabbe47-8df0-4586-8010-3123e1990834");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3e9a7ab1-8691-4167-b96b-46ea5c0a3402", null, "Competitor", "COMPETITOR" },
                    { "3eabbe47-8df0-4586-8010-3123e1990834", null, "Organizer", "ORGANIZER" }
                });
        }
    }
}
