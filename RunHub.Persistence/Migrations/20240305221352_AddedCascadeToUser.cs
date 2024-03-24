using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RunHub.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddedCascadeToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_AspNetUsers_AppUserId",
                table: "Addresses");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "38753a67-032f-44f4-b5e4-cd817f58be42");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f214e536-3a36-437c-be84-65a42d4e2b70");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "20fa095a-7958-444e-93e4-cedd50ba4979", null, "Organizer", "ORGANIZER" },
                    { "c8805117-6c60-4b71-95fd-6b505dbdedf7", null, "Competitor", "COMPETITOR" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Addresses_AspNetUsers_AppUserId",
                table: "Addresses",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_AspNetUsers_AppUserId",
                table: "Addresses");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "20fa095a-7958-444e-93e4-cedd50ba4979");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c8805117-6c60-4b71-95fd-6b505dbdedf7");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "38753a67-032f-44f4-b5e4-cd817f58be42", null, "Organizer", "ORGANIZER" },
                    { "f214e536-3a36-437c-be84-65a42d4e2b70", null, "Competitor", "COMPETITOR" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Addresses_AspNetUsers_AppUserId",
                table: "Addresses",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
