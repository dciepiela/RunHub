using Microsoft.EntityFrameworkCore;
using RunHub.Contracts.Responses;

namespace RunHub.Application.Helpers
{
    public static class CollectionHelper<T>
    {
        public static async Task<PaginetedList<T>> ToPaginatedList(IQueryable<T> source, int pageNumber, int pageSize)
        {
            var count = await source.CountAsync();
            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            return new PaginetedList<T>(items,count,pageNumber,pageSize);
        }
    }
}
