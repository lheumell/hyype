import "../styles/globals.css";

import { AppProps } from "next/app";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

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
import styles from "../styles/Home.module.css";

const app = initializeApp(configuration.firebase);

export const database = getFirestore(app);
export const storage = getStorage(app);

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
  handleNotification: (message: string) => {
    message;
  },
};

export const AuthContext = createContext(defaultAuthContext);

function App(props: AppProps) {
  const { Component, pageProps } = props;

  const [currentUser, setCurrentUser] = useState<TUser>(defaultUser);
  const [isNotificationPush, setNotificationPush] = useState<boolean>(false);
  const [messageNotification, setMessageNotification] = useState<string>("");
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

  const handleNotification = (message: string) => {
    setNotificationPush(true);
    setMessageNotification(message);
  };

  useEffect(() => {
    if (!isNotificationPush) return;
    const timer = setTimeout(() => {
      setNotificationPush(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [isNotificationPush]);

  const saveSettings = (values: any) => {
    setCurrentUser(values);
  };

  return (
    <FirebaseAppProvider firebaseApp={app}>
      <AuthProvider sdk={auth}>
        <AuthContext.Provider
          value={{
            currentUser,
            saveSettings,
            setCurrentUser,
            handleNotification,
          }}
        >
          {isNotificationPush && (
            <p className={styles.global_notification}>{messageNotification}</p>
          )}
          <Component {...pageProps} />
        </AuthContext.Provider>
      </AuthProvider>
    </FirebaseAppProvider>
  );
}

export default App;
