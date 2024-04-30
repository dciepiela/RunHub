import { Table } from "@tanstack/react-table";

interface Props {
  table: Table<any>;
  totalItems: number;
}

export default function CustomPagination({ table, totalItems }: Props) {
  return (
    <>
      {/* pagination */}
      <div className="flex items-center justify-end mt-2 gap-2">
        <button
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          className="p-1 border border-mediumGray px-2 disabled:opacity-30"
        >
          {"<"}
        </button>
        <button
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className="p-1 border border-mediumGray px-2 disabled:opacity-30"
        >
          {">"}
        </button>

        <span className="text-xs md:text-base flex items-center gap-1">
          <div>Strona</div>
          <strong>
            {table.getPageCount() === 0
              ? table.getState().pagination.pageIndex
              : table.getState().pagination.pageIndex + 1}{" "}
            z {table.getPageCount()}
          </strong>
        </span>
        <span className="text-xs md:text-base flex items-center gap-1">
          | Przejdź do strony:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const totalPages = Math.ceil(
                totalItems / table.getState().pagination.pageSize
              );
              let page = parseInt(e.target.value);
              if (isNaN(page) || page < 1) {
                page = 1;
              } else if (page > totalPages) {
                page = totalPages;
              }
              e.target.value = page.toString();
              table.setPageIndex(page - 1);
            }}
            className="text-xs md:text-base w-[60px] md:w-auto"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="text-xs md:text-base p-2 bg-transparent"
        >
          {[10, 15, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Pokaż {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
