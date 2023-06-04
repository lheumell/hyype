import { HyButton } from "../../../index";

import styles from "./HyTabs.module.css";

type TCategories = {
  id: string;
  name: string;
};

interface ITabs {
  categories: TCategories[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const HyTabs = (props: ITabs) => {
  const { categories, selectedCategory, onCategoryChange } = props;
  return (
    <div className={styles.tabs}>
      {categories.map((category) => (
        <HyButton
          variant={selectedCategory === category.name ? undefined : "secondary"}
          key={category.name}
          onClick={() => onCategoryChange(category.name)}
        >
          {category.name}
        </HyButton>
      ))}
    </div>
  );
};
