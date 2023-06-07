import Link from "next/link";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../pages/_app";
import { HyIcon } from "../../Atoms/HyIcon";
import avatar from "../../../assets/avatar.png";

export const HyBurgerMenu = (props: any) => {
  const useAuthContext = useContext(AuthContext);

  const { currentUser } = useAuthContext;

  const { links } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={handleToggle}>Menu</button>
      {isOpen && (
        <>
          <ul>
            {links.map((link: any) => (
              <li key={link.name}>
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
          {currentUser.name ? (
            <div>
              <Link href="/verify">Verifie ton identité !</Link>
              <Link href="/profil">
                <div>
                  <HyIcon size={"20"} icon={avatar} />
                </div>
              </Link>
            </div>
          ) : (
            <Link href="/auth/sign-in">Connexion</Link>
          )}
        </>
      )}
    </div>
  );
};
