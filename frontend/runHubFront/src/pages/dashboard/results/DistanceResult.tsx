import { useState } from "react";
import {
  ColumnFilter,
  Row,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaSort } from "react-icons/fa";
import { DistanceDto } from "../../../app/models/distance";
import { useNavigate } from "react-router-dom";
import Filters from "../../results/Table/Filters";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

interface Props {
  distances: DistanceDto[];
}

export default observer(function DistanceResult({ distances }: Props) {
  const navigate = useNavigate(); // Hook from react-router for navigation
  const columnHelper = createColumnHelper<DistanceDto>();
  const {
    distanceStore: { toggleIsReadyToShow },
  } = useStore();

  const toggleReadyToShow = async (
    distanceId: number,
    isReadyToShow: boolean
  ) => {
    await toggleIsReadyToShow(distanceId, !isReadyToShow);
  };

  const columns = [
    columnHelper.accessor("date", {
      cell: (info) => {
        const dateValue = info.getValue();
        return dateValue
          ? format(new Date(dateValue), "dd MMM yyyy", { locale: pl })
          : "";
      },
      header: "Data biegu",
    }),
    columnHelper.accessor("name", {
      cell: (info) => `${info.getValue()}`,
      header: "Nazwa",
    }),
    columnHelper.accessor("lengthInKilometers", {
      cell: (info) => `${info.getValue()} km`,
      header: "Długość (km)",
    }),
    columnHelper.accessor("distanceAttendees", {
      cell: (info) => info.getValue()?.length || 0,
      header: "Zapisani",
    }),
    {
      id: "results",
      header: "Wyniki",
      cell: ({ row }: { row: Row<any> }) => (
        <button
          onClick={() =>
            navigate(`/admin/dashboard/results/${row.original.distanceId}`)
          }
          disabled={row.original.distanceAttendees <= 0}
          className="px-2 py-2"
        >
          {row.original.distanceAttendees == 0
            ? "Brak zapisanych"
            : "Edytuj wyniki"}
        </button>
      ),
    },
    columnHelper.accessor("isReadyToShow", {
      header: "Zmień status",
      cell: (info) => (
        <button
          type="button"
          className="px-2 py-2 w-full bg-lightYellow"
          onClick={() =>
            toggleReadyToShow(
              info.row.original.distanceId!,
              info.getValue() as boolean
            )
          }
        >
          {(info.getValue() as boolean) ? "Ukryj" : "Ustaw jako widoczne"}
        </button>
      ),
    }),
  ];

  const [data] = useState(distances);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data: distances,
    columns,
    state: {
      columnFilters,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  console.log(data);
  console.log(columnFilters);

  const totalItems = data.length;
  return (
    <div className="p-2  mx-auto text-black fill-whiteNeutral mt-24 max-w-[1240px] ">
      <div className="flex items-center mb-2">
        <Filters
          columnFilters={columnFilters}
          setColumnFilters={
            setColumnFilters as React.Dispatch<
              React.SetStateAction<ColumnFilter[]>
            >
          }
          filter="name"
          placeHolder="Wyszukaj wg. nazwy"
        />
      </div>
      <div className="overflow-x-auto max-w-md sm:max-w-[1240px]">
        <table className="border border-deepBlack w-full text-left ">
          <thead className="bg-lightYellow">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-xs md:text-base  px-3 py-2"
                  >
                    <> {header.column.columnDef.header}</>
                    {header.column.getCanSort() &&
                      !header.column.columnDef.enableSorting && (
                        <button
                          className="mx-3 text-sm focus:outline-none"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <FaSort className="inline-block w-2 h-2 md:w-4 md:h-4" />
                        </button>
                      )}
                    {
                      {
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as "asc" | "desc"]
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`text-xs md:text-base ${
                    i % 2 === 0 ? "bg-mediumGray" : "bg-whiteNeutral"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="text-xs md:text-base px-3 py-2"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="text-center h-32">
                <td colSpan={12}>Brak rekordów!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="flex items-center justify-center md:justify-end mt-2 gap-2">
        <button
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          className="text-xs md:text-base p-1 border border-mediumGray px-2 disabled:opacity-30"
        >
          {"<"}
        </button>
        <button
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className="text-xs md:text-base p-1 border border-mediumGray px-2 disabled:opacity-30"
        >
          {">"}
        </button>

        <span className="text-xs md:text-base flex items-center gap-1">
          <div>Strona</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} z {table.getPageCount()}
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
                page = 1; // Set to first page if NaN or less than 1
              } else if (page > totalPages) {
                page = totalPages; // Set to last page if greater than total pages
              }
              // Ensure page value stays within bounds
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
    </div>
  );
});
