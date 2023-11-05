import React from "react";
import "./Filters.scss";
import Category from "./Category/Category";
import Colour from "./Colour/Colour";
import Price from "./Price/Price";
import Size from "./Size/Size";

interface FiltersProps {
  selectedSizes: string[];
  onSizeChange: (size: string) => void;
  selectedColors: string[];
  onColorChange: (color: string) => void;
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  selectedPrice: string | null;
  onPriceChange: (minPrice: number, maxPrice: number) => void;
}

const Filters: React.FC<FiltersProps> = ({
  selectedSizes,
  onSizeChange,
  selectedColors,
  onColorChange,
  selectedCategories,
  onCategoryChange,
  selectedPrice,
  onPriceChange,
}) => {
  return (
    <div className="filters-container">
      <h4>Filters</h4>
      <Category onCategoryChange={onCategoryChange} />
      <Size selectedSizes={selectedSizes} onSizeChange={onSizeChange} />
      <Price onPriceChange={onPriceChange} />
      <Colour onColorChange={onColorChange} />
    </div>
  );
};

export default Filters;
