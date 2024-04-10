
using System.Text.Json;

namespace RunHub.API.Extensions
{
    public static class ResultsExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, int currentPage,
           int itemsPerPage, int totalItems, int totalPages)
        {
            var paginationHeader = new
            {
                currentPage,
                itemsPerPage,
                totalItems,
                totalPages
            };

            response.Headers.Append("Pagination", JsonSerializer.Serialize(paginationHeader));
            response.Headers.Append("Access-Control-Expose-Headers", "Pagination");
        }
    }
}
