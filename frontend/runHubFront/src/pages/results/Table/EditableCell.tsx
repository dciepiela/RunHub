import { observer } from "mobx-react-lite";
import { useState } from "react";

const EditableCell = ({ getValue, row, column, updateData }) => {
  const [value, setValue] = useState(getValue());

  const onBlur = () => {
    const initialValue = getValue();
    if (initialValue !== value) {
      updateData(row.original.resultId, column.id, value);
    }
  };

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      className="px-3 py-2 w-full overflow-hidden text-ellipsis whitespace-nowrap rounded bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
    />
  );
};

export default EditableCell;
