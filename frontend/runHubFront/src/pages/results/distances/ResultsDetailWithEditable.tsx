import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Result } from "../../../app/models/result";
import EditableCell from "../Table/EditableCell";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DownloadBtn from "../Table/DownloadBtn";
import { FaSort } from "react-icons/fa";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export const columnHelperResult = createColumnHelper<Result>();

export default observer(function ResultsDetailWithEditable() {
  const navigate = useNavigate();
  const { resultStore } = useStore();
  const { loadResults } = resultStore;
  const { distanceId } = useParams<{ distanceId: string }>();
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    loadResults(distanceId);
  }, [distanceId, resultStore]);

  const updateResultData = async (
    resultId: number,
    field: string,
    value: any
  ) => {
    try {
      await resultStore.updateResult(resultId, field, value);
      setResults((prevResults) =>
        prevResults.map((result) =>
          result.resultId === resultId ? { ...result, [field]: value } : result
        )
      );
    } catch (error) {
      console.error("Error updating result:", error);
    }
  };

  const columns = [
    columnHelperResult.accessor("resultId", {
      header: "Result ID",
      cell: (info) => info.getValue(),
    }),
    columnHelperResult.accessor("userId", {
      header: "User ID",
      cell: (info) => info.getValue(),
    }),
    columnHelperResult.accessor("time", {
      header: "Time",
      cell: (info) => <EditableCell {...info} updateData={updateResultData} />,
    }),
    columnHelperResult.accessor("place", {
      header: "Place",
      cell: (info) => <EditableCell {...info} updateData={updateResultData} />,
    }),
    {
      id: "details",
      header: "Details",
      cell: ({ row }) => (
        <button
          onClick={() => navigate(`/user-results/${row.original.userId}`)}
        >
          View Details
        </button>
      ),
    },
  ];

  const tableInstance = useReactTable({
    data: results,
    columns,
    // state: {
    //   columnFilters,
    // },
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-2 max-w-[1240px] mx-auto text-black fill-whiteNeutral mt-24 overflow-x-auto">
      <div className="flex justify-between items-center mb-2">
        {/* <Filters /> */}
        <DownloadBtn data={results} fileName="results" />
      </div>
      <table className="border border-deepBlack w-full text-left">
        <thead className="bg-lightYellow">
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="capitalize px-3 py-2">
                  {header.column.columnDef.header}
                  {header.column.getCanSort() && (
                    <button
                      className="mx-3 text-sm focus:outline-none"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <FaSort className="inline-block w-4 h-4" />
                    </button>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.length ? (
            tableInstance.getRowModel().rows.map((row, i) => (
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
              <td colSpan={12}>Brak rekordów!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
});
