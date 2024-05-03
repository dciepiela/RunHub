using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RunHub.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class RaceBibAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e3a207d4-e926-43f1-bf4f-55d1e130f2e8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fcb1f459-923f-4cf0-bf86-92eb75c0bbb1");

            migrationBuilder.AddColumn<int>(
                name: "RaceBib",
                table: "DistanceAttendees",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1c41ba8b-af56-47fd-9e0a-bc2241d1ec4f", null, "Organizer", "ORGANIZER" },
                    { "82deab3b-e12f-4279-b0f6-3dcb643eb29b", null, "Competitor", "COMPETITOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1c41ba8b-af56-47fd-9e0a-bc2241d1ec4f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "82deab3b-e12f-4279-b0f6-3dcb643eb29b");

            migrationBuilder.DropColumn(
                name: "RaceBib",
                table: "DistanceAttendees");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "e3a207d4-e926-43f1-bf4f-55d1e130f2e8", null, "Organizer", "ORGANIZER" },
                    { "fcb1f459-923f-4cf0-bf86-92eb75c0bbb1", null, "Competitor", "COMPETITOR" }
                });
        }
    }
}
