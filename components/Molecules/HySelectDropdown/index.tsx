import { Listbox } from "@headlessui/react";
import styles from "./HySelectDropdown.module.css";
import { HyText } from "../../..";

export const HySelectDropdown = (props: any) => {
  const { items, selectedItem, setSelectedItem } = props;

  return (
    <div className={styles.dropdownContainer}>
      <HyText weight="bold">label:</HyText>
      <div className={styles.selectdropdown}>
        {selectedItem && (
          <Listbox value={selectedItem} onChange={setSelectedItem}>
            <Listbox.Button>{selectedItem.name}</Listbox.Button>
            <Listbox.Options className={styles.list}>
              {items.map((item: any) => (
                <Listbox.Option
                  className={styles.item}
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
    </div>
  );
};
