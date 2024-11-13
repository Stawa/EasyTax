import admin from "firebase-admin";
import { cert, getApps as getAdminApps } from "firebase-admin/app";
import {
  DocumentData,
  Firestore,
  getFirestore,
  WhereFilterOp,
} from "firebase-admin/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

function initializeAdminApp() {
  if (getAdminApps().length === 0) {
    return admin.initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      }),
    });
  }
  return admin.app();
}

const adminApp = initializeAdminApp();
const firestore: Firestore = getFirestore(adminApp);

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

function initializeClientApp() {
  return firebase.apps.length === 0
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();
}

const app = initializeClientApp();
const auth = firebase.auth(app);

interface FirestoreService {
  addDocument: (
    collection: string,
    id: string,
    data: DocumentData
  ) => Promise<string>;
  getDocument: (collection: string, id: string) => Promise<DocumentData | null>;
  updateDocument: (
    collection: string,
    id: string,
    data: DocumentData
  ) => Promise<void>;
  setDocument: (
    collection: string,
    id: string,
    data: DocumentData
  ) => Promise<void>;
  deleteDocument: (collection: string, id: string) => Promise<void>;
  queryCollection: (
    collection: string,
    field: string,
    operator: WhereFilterOp,
    value: unknown
  ) => Promise<DocumentData[]>;
}

function createFirestoreService(db: Firestore): FirestoreService {
  return {
    async addDocument(collection, id, data) {
      await db.collection(collection).doc(id).set(data);
      return id;
    },

    async getDocument(collection, id) {
      const docRef = await db.collection(collection).doc(id).get();
      return docRef.exists ? (docRef.data() as DocumentData) : null;
    },

    async updateDocument(collection, id, data) {
      await db.collection(collection).doc(id).update(data);
    },

    async setDocument(collection, id, data) {
      await db.collection(collection).doc(id).set(data, { merge: true });
    },

    async deleteDocument(collection, id) {
      await db.collection(collection).doc(id).delete();
    },

    async queryCollection(collection, field, operator, value) {
      const querySnapshot = await db
        .collection(collection)
        .where(field, operator, value)
        .get();
      return querySnapshot.docs.map((doc) => doc.data());
    },
  };
}

export const firestoreService = createFirestoreService(firestore);
export { auth, adminApp, app };
