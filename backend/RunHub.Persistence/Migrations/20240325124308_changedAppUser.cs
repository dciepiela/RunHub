using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RunHub.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class changedAppUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4f2c20bd-e261-414e-8ad5-1529e83b6533");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b60a10a7-e33e-466f-a7b0-b56c80a9e4ff");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4954dfbf-01b6-496e-8cb5-dc421a0709bc", null, "Organizer", "ORGANIZER" },
                    { "4e14cc4e-f379-4858-bcc4-53ed4fe7a774", null, "Competitor", "COMPETITOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4954dfbf-01b6-496e-8cb5-dc421a0709bc");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4e14cc4e-f379-4858-bcc4-53ed4fe7a774");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4f2c20bd-e261-414e-8ad5-1529e83b6533", null, "Competitor", "COMPETITOR" },
                    { "b60a10a7-e33e-466f-a7b0-b56c80a9e4ff", null, "Organizer", "ORGANIZER" }
                });
        }
    }
}
