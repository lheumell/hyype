import "../styles/globals.css";

import { AppProps } from "next/app";
import { initializeApp } from "firebase/app";

import {
  initializeAuth,
  indexedDBLocalPersistence,
  inMemoryPersistence,
} from "firebase/auth";

import { FirebaseAppProvider, AuthProvider } from "reactfire";

import configuration from "../configuration";
import { isBrowser } from "../lib/generic/isBrowser";
import { SetStateAction, createContext, useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { getOneDocByCollectionWhere } from "../lib/endpoints";

const app = initializeApp(configuration.firebase);

export const database = getFirestore(app);

type TUser = {
  name: string;
  id: string;
  email: string;
  eventsBook: string[];
};

const defaultUser = {
  name: "",
  id: "",
  email: "",
  eventsBook: [""],
};

const defaultAuthContext = {
  currentUser: defaultUser,
  saveSettings: (value: any) => {
    value;
  },
  setCurrentUser: (value: SetStateAction<TUser>) => {
    value;
  },
};

export const AuthContext = createContext(defaultAuthContext);

function App(props: AppProps) {
  const { Component, pageProps } = props;

  const [currentUser, setCurrentUser] = useState<TUser>(defaultUser);
  const persistence = isBrowser()
    ? indexedDBLocalPersistence
    : inMemoryPersistence;

  const auth = initializeAuth(app, { persistence });

  useEffect(() => {
    async function fetchData(user: any) {
      setCurrentUser(
        await getOneDocByCollectionWhere("users", "id", "==", user?.uid)
      );
    }

    const listener = auth.onAuthStateChanged((user) => {
      if (user) fetchData(user);
    });
    return () => listener();
  }, [auth]);

  const saveSettings = (values: any) => {
    setCurrentUser(values);
  };

  return (
    <FirebaseAppProvider firebaseApp={app}>
      <AuthProvider sdk={auth}>
        <AuthContext.Provider
          value={{ currentUser, saveSettings, setCurrentUser }}
        >
          <Component {...pageProps} />
        </AuthContext.Provider>
      </AuthProvider>
    </FirebaseAppProvider>
  );
}

export default App;
