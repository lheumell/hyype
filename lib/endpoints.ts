import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { database } from "../pages/_app";

export const getOneDocByCollectionWhere = async (
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
  return result;
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

export const createDocByCollection = async (
  collectionReference: string,
  data: any
) => {
  const docReference = collection(database, collectionReference);
  addDoc(docReference, data);
};

export const findDocById = async (collectionReference: string, id: any) => {
  const docReference = collection(database, collectionReference);
  const docRef = doc(docReference, id);
  const docSnap = await getDoc(docRef);
  return { ...docSnap.data(), id: docSnap.id };
};
