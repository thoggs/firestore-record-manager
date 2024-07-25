import * as admin from "firebase-admin";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * Class responsible for initializing the Firebase Admin SDK.
 */
export class FirebaseConfig {
  /**
   * Initializes the Firebase Admin SDK with the configuration
   * provided in the environment variables, or uses the default
   * application credentials if variables are not provided.
   * Throws an error if any required environment variable is missing
   * and default credentials are not available.
   */
  static initialize() {
    if (!admin.apps.length) {
      if (
        process.env.FIREBASE_API_KEY &&
        process.env.FIREBASE_AUTH_DOMAIN &&
        process.env.FIREBASE_PROJECT_ID
      ) {
        const firebaseConfig = {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
          measurementId: process.env.FIREBASE_MEASUREMENT_ID,
        };
        admin.initializeApp(firebaseConfig);
      } else {
        console.warn("FIREBASE_* env vars missing, using default credentials.");
        admin.initializeApp();
      }
    }
  }
}
