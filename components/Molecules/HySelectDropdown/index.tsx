import { Listbox } from "@headlessui/react";
import styles from "./HySelectDropdown.module.css";

export const HySelectDropdown = (props: any) => {
  const { items, selectedItem, setSelectedItem } = props;

  return (
    <div className={styles.selectdropdown}>
      {selectedItem && (
        <Listbox value={selectedItem} onChange={setSelectedItem}>
          <Listbox.Button>{selectedItem.name}</Listbox.Button>
          <Listbox.Options>
            {items.map((item: any) => (
              <Listbox.Option
                key={item.id}
                value={item}
                disabled={item.unavailable}
              >
                {item.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      )}
    </div>
  );
};
