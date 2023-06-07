import Link from "next/link";
import React, { useState } from "react";

export const HyBurgerMenu = (props: any) => {
  const { links } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={handleToggle}>Menu</button>
      {isOpen && (
        <ul>
          {links.map((link: any) => (
            <li key={link.name}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
