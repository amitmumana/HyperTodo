import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const todoCollection = collection(db, `documents/{user.uid}`);

export const addTodo = async (todo: any) => {
  return await addDoc(todoCollection, todo);
};

export const getTodos = async () => {
  const snapshot = await getDocs(todoCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deleteTodo = async (id: string) => {
  return await deleteDoc(doc(db, "todos", id));
};
