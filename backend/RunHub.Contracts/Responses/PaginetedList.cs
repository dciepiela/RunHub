using Microsoft.EntityFrameworkCore;

namespace RunHub.Contracts.Responses
{
    public class PaginetedList<T> : List<T>
    {
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public int CurrentPage { get; set; }
        public IEnumerable<T> Items { get; set; }

        public PaginetedList(IEnumerable<T> items, int count, int pageNumber, int pageSize)
        {
            CurrentPage = pageNumber;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            PageSize = pageSize;
            TotalCount = count;
            Items = items;
            AddRange(items);
        }

        public static async Task<PaginetedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
        {
            var count = await source.CountAsync();
            var items = await source.Skip((pageNumber-1) * pageSize).Take(pageSize).ToListAsync();

            return new PaginetedList<T>(items, count, pageNumber, pageSize);
        }
    }
}
