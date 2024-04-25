const EditableCheckbox = ({ isChecked, onChange }) => {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
      style={{ cursor: "pointer" }}
    />
  );
};

export default EditableCheckbox;
