import { z } from "zod";

const envSchema = z.object({
  // Firebase
  FIREBASE_API_KEY: z.string(),
  FIREBASE_AUTH_DOMAIN: z.string(),
  FIREBASE_DATABASE_URL: z.string(),
  FIREBASE_PROJECT_ID: z.string(),
  FIREBASE_STORAGE_BUCKET: z.string(),
  FIREBASE_MESSAGING_SENDER_ID: z.string(),
  FIREBASE_APP_ID: z.string(),
  FIREBASE_MEASUREMENT_ID: z.string(),

  // Firebase admin
  FIREBASE_ADMIN_TYPE: z.string(),
  FIREBASE_ADMIN_PROJECT_ID: z.string(),
  FIREBASE_ADMIN_PRIVATE_KEY_ID: z.string(),
  FIREBASE_ADMIN_PRIVATE_KEY: z.string(),
  FIREBASE_ADMIN_CLIENT_EMAIL: z.string(),
  FIREBASE_ADMIN_CLIENT_ID: z.string(),
  FIREBASE_ADMIN_AUTH_URI: z.string(),
  FIREBASE_ADMIN_TOKEN_URI: z.string(),
  FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL: z.string(),
  FIREBASE_ADMIN_CLIENT_X509_CERT_URL: z.string(),
  FIREBASE_ADMIN_UNIVERSE_DOMAIN: z.string(),
  DEVELOPMENT: z.string().optional(),
});

export const env = envSchema.parse(process.env);
