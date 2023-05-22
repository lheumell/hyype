import { HyButton } from "../../../index";

type TCategories = {
  id: string;
  name: string;
};

interface ICategoriesList {
  categories: TCategories[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const HyCategoriesList = (props: ICategoriesList) => {
  const { categories, selectedCategory, onCategoryChange } = props;
  return (
    <div>
      {categories.map((category) => (
        <HyButton
          key={category.name}
          onClick={() => onCategoryChange(category.name)}
        >
          {category.name}
        </HyButton>
      ))}
    </div>
  );
};
