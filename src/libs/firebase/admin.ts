import admin from 'firebase-admin';

let firebaseApp;

if (!admin.apps.length) {
  try {
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(
          /\\n/g,
          '\n'
        ),
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
    console.log('Firebase Admin SDK: Initialization successful.');
  } catch (error) {
    console.error('Firebase Admin SDK: Initialization failed.', error);
    // Rethrow the error or handle it as appropriate for your application
    throw error;
  }
} else {
  firebaseApp = admin.app();
  console.log('Firebase Admin SDK: Reusing existing app.');
}

// Alterando para usar o Realtime Database
const db = firebaseApp.database();

export { firebaseApp, db };