import { useState } from "react";
import { STATUSES } from "../fake";

export const ColorIcon = ({ color, ...props }) => (
  <div className={`w-12 h-12 bg-${color} rounded-md`} {...props} />
);

const StatusCell = ({ getValue, row, column, table }) => {
  const { name, color } = getValue() || {};
  const { updateData } = table.options.meta;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-full w-full text-left py-1.5 px-1.5 ${
          color ? `bg-${color}` : "bg-transparent"
        } text-black`}
      >
        {name}
      </button>
      {isOpen && (
        <div className="absolute left-0 z-10 mt-2 bg-white border border-gray-200 shadow-lg rounded-md">
          <div className="py-1">
            <button
              onClick={() => {
                updateData(row.index, column.id, null);
                setIsOpen(false);
              }}
              className={`flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 bg-${color} w-full text-left`}
            >
              None
            </button>
            {STATUSES.map((status) => (
              <button
                key={status.id}
                onClick={() => {
                  updateData(row.index, column.id, status);
                  setIsOpen(false);
                }}
                className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
              >
                <ColorIcon color={status.color} />
                {status.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default StatusCell;
