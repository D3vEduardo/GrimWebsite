import { initializeApp } from "firebase-admin";
import { cert, ServiceAccount } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";
import { env } from "@libs/zod/env";

const firebaseAdminConfig: ServiceAccount = {
  clientEmail: env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
  projectId: env.FIREBASE_ADMIN_PROJECT_ID
}

export const app = initializeApp({
  credential: cert(firebaseAdminConfig)
});
export const db = getDatabase(app);