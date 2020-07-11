import config from './config';
import firebase from 'firebase/app';
import 'firebase/functions';
// import 'firebase/auth' // If you need it
// import 'firebase/firestore' // If you need it
// import 'firebase/storage' // If you need it
// import 'firebase/analytics' // If you need it

const clientCredentials = {
  development: {
    apiKey: '__________',
    authDomain: 'PROJECT_ID_DEV.firebaseapp.com',
    databaseURL: 'https://PROJECT_ID_DEV.firebaseio.com',
    projectId: 'PROJECT_ID_DEV',
    storageBucket: 'PROJECT_ID_DEV.appspot.com',
    messagingSenderId: '__________',
  },

  staging: {
    apiKey: '__________',
    authDomain: 'PROJECT_ID_STAGING.firebaseapp.com',
    databaseURL: 'https://PROJECT_ID_STAGING.firebaseio.com',
    projectId: 'PROJECT_ID_STAGING',
    storageBucket: 'PROJECT_ID_STAGING.appspot.com',
    messagingSenderId: '__________',
  },

  production: {
    apiKey: '__________',
    authDomain: 'PROJECT_ID_PROD.firebaseapp.com',
    databaseURL: 'https://PROJECT_ID_PROD.firebaseio.com',
    projectId: 'PROJECT_ID_PROD',
    storageBucket: 'PROJECT_ID_PROD.appspot.com',
    messagingSenderId: '__________',
  },
};

// Check that `window` is in scope for the analytics module!
if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(clientCredentials[config.FIREBASE_ENV]);
  // To enable analytics. https://firebase.google.com/docs/analytics/get-started
  // if ('measurementId' in clientCredentials) firebase.analytics();
}

export default firebase;
