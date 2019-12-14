import { 
  // Firebase Credentials
  FIREBASE_API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,

  // Algolia Credentials
  ALGOLIA_API_KEY,
  ALGOLIA_APP_ID,
  ALGOLIA_INDEX_NAME,

  // Stripe Credentials
  STRIPE_API_KEY
} from 'react-native-dotenv';

export const FirebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID
};

export const AlgoliaSearchConfig = {
  apiKey: ALGOLIA_API_KEY,
  applicationID: ALGOLIA_APP_ID,
  indexName: ALGOLIA_INDEX_NAME
};

export const StripeConfig = {
  apiKey: STRIPE_API_KEY
};
