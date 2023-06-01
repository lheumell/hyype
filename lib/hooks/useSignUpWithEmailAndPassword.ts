import { useCallback } from "react";
import { useAuth } from "reactfire";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { useRequestState } from "./useRequestState";
import { createDocByCollectionWithUID } from "../endpoints";

export function useSignUpWithEmailAndPassword() {
  const auth = useAuth();

  const { state, setLoading, setData, setError } = useRequestState<
    UserCredential,
    FirebaseError
  >();

  const createUserInFirestore = (user: any) => {
    const dataUser = {
      email: user.email,
      id: user.uid,
      eventsBook: [],
      name: "random",
    };
    createDocByCollectionWithUID("users", dataUser, user.uid);
  };

  const signUp = useCallback(
    async (email: string, password: string) => {
      setLoading(true);

      try {
        const credential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        console.log("email", email, password);
        console.log("credential", credential);

        createUserInFirestore(credential.user);

        setData(credential);
      } catch (error) {
        setError(error as FirebaseError);
      }
    },
    [auth, setData, setError, setLoading]
  );

  return [signUp, state] as [typeof signUp, typeof state];
}
