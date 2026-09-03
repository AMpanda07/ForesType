import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

let app;

try {
  // Try to initialize with a service account json if provided via path
  // In a real prod environment we'd use GOOGLE_APPLICATION_CREDENTIALS
  // or a stringified JSON in FIREBASE_SERVICE_ACCOUNT
  if (!admin.apps.length) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    } else {
      // Fallback for development without service account (will fail if not authenticated locally, e.g. via ADC)
      app = admin.initializeApp();
    }
  } else {
    app = admin.app();
  }
} catch (error) {
  console.error('Firebase Admin initialization error:', error);
}

export default admin;
