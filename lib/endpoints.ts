import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { database } from "../pages/_app";

export const getDocByCollectionWhere = async (
  collectionReference: string,
  attribut: string,
  operator: "==",
  value: any
) => {
  const docReference = collection(database, collectionReference);
  const q = query(docReference, where(attribut, operator, value));
  const querySnapshot = await getDocs(q);
  const result = querySnapshot.docs.map((item: any) => {
    return { ...item.data(), id: item.id };
  });
  return result[0];
};

export const getDocByCollection = async (collectionReference: string) => {
  const docReference = collection(database, collectionReference);
  const querySnapshot = await getDocs(docReference);
  const result = querySnapshot.docs.map((item: any) => {
    return { ...item.data(), id: item.id };
  });
  return result;
};

export const updateDocByCollection = async (
  collectionReference: string,
  updateData: any,
  value: any
) => {
  const docReference = collection(database, collectionReference);
  const document = doc(docReference, value);
  await updateDoc(document, updateData);
};
