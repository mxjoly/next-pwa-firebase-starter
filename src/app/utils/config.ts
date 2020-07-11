enum FirebaseEnv {
  DEV = 'development',
  STAG = 'staging',
  PROD = 'production',
}

interface Config {
  APP_NAME: string;
  ASSETS_PATH: string;
  APP_PROTOCOL: 'http' | 'https';
  APP_HOST: string;
  FIREBASE_ENV: FirebaseEnv;
}

interface ConfigMap {
  [key: string]: Config;
}

// ------------------------------------------------------------ //

const defaultConfigs = {
  APP_NAME: 'Blipee',
  ASSETS_PATH: '/static/assets',
};

const configs: ConfigMap = {
  local: {
    ...defaultConfigs,
    APP_PROTOCOL: 'http',
    APP_HOST: `localhost:${process.env.PORT || 3000}`,
    FIREBASE_ENV: FirebaseEnv.DEV,
  },

  development: {
    ...defaultConfigs,
    APP_PROTOCOL: 'https',
    APP_HOST: '_________.firebaseapp.com',
    FIREBASE_ENV: FirebaseEnv.DEV,
  },

  staging: {
    ...defaultConfigs,
    APP_PROTOCOL: 'https',
    APP_HOST: '_________.firebaseapp.com',
    FIREBASE_ENV: FirebaseEnv.STAG,
  },

  production: {
    ...defaultConfigs,
    APP_PROTOCOL: 'https',
    APP_HOST: '_________.firebaseapp.com',
    FIREBASE_ENV: FirebaseEnv.PROD,
  },
};

// @ts-ignore
export default configs[__CONFIG__];
