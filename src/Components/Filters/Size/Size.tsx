import React from "react";
interface SizeProps {
    selectedSizes: string[];
    onSizeChange: (size: string) => void;
  }
  
const Size: React.FC<SizeProps> = ({ selectedSizes, onSizeChange }) => {
    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        onSizeChange(value);
      };
  return (
    <div className="filter-section">
      <h5>Size</h5>
      <label>
        <input
          type="checkbox"
          name="size"
          value="small"
          checked={selectedSizes.includes("small")}
          onChange={handleSizeChange}
        />
        Small
      </label>
      <label>
        <input
          type="checkbox"
          name="size"
          value="medium"
          checked={selectedSizes.includes("medium")}
          onChange={handleSizeChange}
        />
        Medium
      </label>
      <label>
        <input
          type="checkbox"
          name="size"
          value="large"
          checked={selectedSizes.includes("large")}
          onChange={handleSizeChange}
        />
        Large
      </label>
    </div>
  );
};

export default Size;
