using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RunHub.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ChangedTypeOfDateOfBirth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "36fd416f-469d-437f-b0d7-0ab0b73e7c80");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dc4d4b2e-a77b-43df-b466-d3a31010bbf1");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "DateOfBirth",
                table: "AspNetUsers",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4f2c20bd-e261-414e-8ad5-1529e83b6533", null, "Competitor", "COMPETITOR" },
                    { "b60a10a7-e33e-466f-a7b0-b56c80a9e4ff", null, "Organizer", "ORGANIZER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4f2c20bd-e261-414e-8ad5-1529e83b6533");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b60a10a7-e33e-466f-a7b0-b56c80a9e4ff");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOfBirth",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "36fd416f-469d-437f-b0d7-0ab0b73e7c80", null, "Organizer", "ORGANIZER" },
                    { "dc4d4b2e-a77b-43df-b466-d3a31010bbf1", null, "Competitor", "COMPETITOR" }
                });
        }
    }
}
