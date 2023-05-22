import "../styles/globals.css";

import { AppProps } from "next/app";
import { initializeApp } from "firebase/app";

import {
  initializeAuth,
  indexedDBLocalPersistence,
  connectAuthEmulator,
  inMemoryPersistence,
} from "firebase/auth";

import { FirebaseAppProvider, AuthProvider, useSigninCheck } from "reactfire";

import configuration from "../configuration";
import { isBrowser } from "../lib/generic/isBrowser";
import { createContext, useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { getDocByCollectionWhere } from "../lib/endpoints";

const app = initializeApp(configuration.firebase);

export const database = getFirestore(app);

type TUser = {
  id: string;
  email: string;
  eventsBook: string[];
};

const defaultAuthContext = {
  currentUser: {
    id: "",
    email: "",
    eventsBook: [],
  },
  saveSetting: (value: any) => {},
};

export const AuthContext = createContext({});

function App(props: AppProps) {
  const { Component, pageProps } = props;

  // const authReactFire = useAuth();

  // const { status } = useSigninCheck();

  const [currentUser, setCurrentUser] = useState<TUser>();
  const persistence = isBrowser()
    ? indexedDBLocalPersistence
    : inMemoryPersistence;

  const auth = initializeAuth(app, { persistence });

  useEffect(() => {
    async function fetchData(user: any) {
      setCurrentUser(
        await getDocByCollectionWhere("users", "id", "==", user?.uid)
      );
    }

    // if (status !== "success") {
    //   return;
    // }

    const listener = auth.onAuthStateChanged((user) => {
      if (user) fetchData(user);
    });

    // destroy listener on un-mounts
    return () => listener();
  }, [auth]);

  const saveSettings = (values: any) => {
    setCurrentUser(values);
  };

  if (configuration.emulator && !("emulator" in auth.config)) {
    // we can get the host by
    // combining the local emulator host with the Auth port
    const host = getAuthEmulatorHost();
    connectAuthEmulator(auth, host);
  }

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

function getAuthEmulatorHost() {
  const host = process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST;
  const port = process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_PORT;

  return ["http://", host, ":", port].join("");
}
