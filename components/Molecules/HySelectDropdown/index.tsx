import { Listbox } from "@headlessui/react";
import styles from "./HySelectDropdown.module.css";

const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];

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
