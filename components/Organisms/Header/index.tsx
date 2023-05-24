import React, { useContext, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { HyIcon } from "../../../index";

import logo from "../../../assets/logo.svg";
import avatar from "../../../assets/avatar.png";

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
      <div className={styles.logocontainer}>
        <HyIcon icon={logo} size="80" />
      </div>
      <div className={styles.navcontainer}>
        <ul>
          {links.map((link) => (
            <li key={link.name} className={styles.itemNavigation}>
              <Link className={styles.itemHref} href={link.href}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {currentUser ? (
        <Link className={styles.itemHref} href="/profil">
          <div className={styles.icon}>
            <HyIcon icon={avatar} size={"20"} />
          </div>
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
