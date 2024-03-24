using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RunHub.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ChangedColumnInAddress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "20fa095a-7958-444e-93e4-cedd50ba4979");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c8805117-6c60-4b71-95fd-6b505dbdedf7");

            migrationBuilder.RenameColumn(
                name: "AddressID",
                table: "Addresses",
                newName: "AddressId");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "36fd416f-469d-437f-b0d7-0ab0b73e7c80", null, "Organizer", "ORGANIZER" },
                    { "dc4d4b2e-a77b-43df-b466-d3a31010bbf1", null, "Competitor", "COMPETITOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "36fd416f-469d-437f-b0d7-0ab0b73e7c80");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dc4d4b2e-a77b-43df-b466-d3a31010bbf1");

            migrationBuilder.RenameColumn(
                name: "AddressId",
                table: "Addresses",
                newName: "AddressID");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "20fa095a-7958-444e-93e4-cedd50ba4979", null, "Organizer", "ORGANIZER" },
                    { "c8805117-6c60-4b71-95fd-6b505dbdedf7", null, "Competitor", "COMPETITOR" }
                });
        }
    }
}
