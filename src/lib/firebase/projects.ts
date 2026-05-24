import {
  collection,
  getDocs,
  orderBy,
  query,
  type DocumentData,
  type QueryDocumentSnapshot
} from "firebase/firestore";

import { db, isFirebaseConfigured } from "@/lib/firebase/client";
import type { Project } from "@/types/project";

const ensureDb = () => {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase Firestore is not configured. Check NEXT_PUBLIC_FIREBASE_* values.");
  }

  return db;
};

const mapProject = (snapshot: QueryDocumentSnapshot<DocumentData>): Project => {
  const data = snapshot.data();

  return {
    id: snapshot.id,
    title: data.title ?? "",
    description: data.description ?? "",
    techStack: Array.isArray(data.techStack)
      ? data.techStack.filter((item: unknown): item is string => typeof item === "string")
      : [],
    githubUrl: data.githubUrl ?? "",
    imageUrl: data.imageUrl ?? ""
  };
};

export const getAllProjects = async () => {
  const projectsRef = collection(ensureDb(), "projects");
  const projectsQuery = query(projectsRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(projectsQuery);

  return snapshot.docs.map(mapProject);
};
