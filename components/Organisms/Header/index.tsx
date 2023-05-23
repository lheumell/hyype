import React, { useContext, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { HyIcon } from "../../../index";

import logo from "../../../assets/logo.png";

import styles from "./Header.module.css";
import Link from "next/link";
import { AuthContext } from "../../../pages/_app";

const Header = () => {
  const useAuthContext = useContext(AuthContext);

  const { currentUser } = useAuthContext;

  const links = [
    {
      name: "Evenements",
      href: "/events",
    },
    {
      name: " Crée ton evenement",
      href: "/create-events",
    },
    {
      name: "A propos",
      href: "/about",
    },
  ];

  return (
    <div className={styles.header}>
      <HyIcon icon={logo} size="80" />
      <ul>
        {links.map((link) => (
          <li key={link.name} className={styles.itemNavigation}>
            <Link className={styles.itemHref} href={link.href}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      {currentUser ? (
        <Link className={styles.itemHref} href="/profil">
          profil {currentUser.name}
        </Link>
      ) : (
        <Link className={styles.itemHref} href="/auth">
          Connexion
        </Link>
      )}
    </div>
  );
};

export default Header;
