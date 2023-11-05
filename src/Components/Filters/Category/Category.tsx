import React from "react";

interface CategoryProps {
  onCategoryChange: (category: string) => void;
}

const Category: React.FC<CategoryProps> = ({ onCategoryChange }) => {
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onCategoryChange(value);
  };
  return (
    <div className="filter-section">
      <h5>Category</h5>
      <label>
        <input
          type="checkbox"
          name="category"
          value="t-shirt"
          onChange={handleCategoryChange}
        />
        T-shirt
      </label>
      <label>
        <input
          type="checkbox"
          name="category"
          value="jeans"
          onChange={handleCategoryChange}
        />
        Jeans
      </label>
      <label>
        <input
          type="checkbox"
          name="category"
          value="shirts"
          onChange={handleCategoryChange}
        />
        Shirts
      </label>
      {/* <label>
        <input
          type="checkbox"
          name="category"
          value="trousers"
          onChange={handleCategoryChange}
        />
        Trousers
      </label> */}
      <label>
        <input
          type="checkbox"
          name="category"
          value="jacket"
          onChange={handleCategoryChange}
        />
        Jacket
      </label>
      <label>
        <input
          type="checkbox"
          name="category"
          value="sweater"
          onChange={handleCategoryChange}
        />
        Sweater
      </label>
      <label>
        <input
          type="checkbox"
          name="category"
          value="hoodie"
          onChange={handleCategoryChange}
        />
        Hoodie
      </label>
    </div>
  );
};

export default Category;
