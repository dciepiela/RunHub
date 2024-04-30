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
import { observer } from "mobx-react-lite";
import FilterDistances from "./FilterDistances";
import CustomPagination from "../../../components/pagination/CustomPagination";
import { format } from "date-fns";
import { pl } from "date-fns/locale/pl";

interface Props {
  distances: DistanceDto[];
}

export default observer(function DistanceTable({ distances }: Props) {
  const navigate = useNavigate();

  const columnHelper = createColumnHelper<DistanceDto>();
  const columns = [
    columnHelper.accessor("date", {
      cell: (info) => {
        const dateValue = info.getValue();
        return dateValue
          ? format(dateValue, "dd MMM yyyy", { locale: pl })
          : "";
      },
      header: "Data biegu",
    }),
    columnHelper.accessor("name", {
      cell: (info) => `${info.getValue()}`,
      header: "Nazwa dystansu",
    }),
    columnHelper.accessor("lengthInKilometers", {
      cell: (info) => `${info.getValue()} km`,
      header: "Długość (km)",
    }),
    columnHelper.accessor("distanceAttendees", {
      cell: (info) => info.getValue()?.length || 0,
      header: "Liczba uczestników",
    }),
    {
      id: "results",
      header: "Wyniki",
      cell: ({ row }: { row: Row<any> }) => (
        <button
          onClick={() => navigate(`/results/${row.original.distanceId}`)}
          className={`px-3 py-2 w-full ${
            row.original.distanceAttendees.length > 0 ? "active" : "inactive"
          }`}
          disabled={row.original.distanceAttendees.length === 0}
        >
          {row.original.distanceAttendees.length > 0 ? "Zobacz Wyniki" : "Brak"}
        </button>
      ),
    },
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
    <div className="p-2 max-w-[1240px] mx-auto text-black fill-whiteNeutral mt-24 overflow-x-auto">
      <div className="flex justify-between items-center mb-2">
        <div className="w-full flex items-center gap-1">
          <FilterDistances
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
        {/* <DownloadBtn data={data} fileName={`wyniki`} /> */}
      </div>
      <table className="border border-deepBlack w-full text-center">
        <thead className="bg-lightYellow">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="capitalize px-3 py-2">
                  {typeof header.column.columnDef.header === "function"
                    ? header.column.columnDef.header(header.getContext())
                    : header.column.columnDef.header}{" "}
                  {header.column.getCanSort() &&
                    !header.column.columnDef.enableSorting && (
                      <button
                        className="mx-3 text-sm focus:outline-none"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <FaSort className="inline-block w-4 h-4" />
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
                className={`${
                  i % 2 === 0 ? "bg-mediumGray" : "bg-whiteNeutral"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="text-center h-32">
              <td colSpan={12}>Brak wyników!</td>
            </tr>
          )}
        </tbody>
      </table>
      <CustomPagination table={table} totalItems={totalItems} />
    </div>
  );
});
