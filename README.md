# Next.js Starter

This is a starter project implementing a server side rendering Next.js progressive web application on Firebase Cloud Function with Firebase Hosting. Enjoy it !

## Stack

- [React](https://en.reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Material-UI](https://material-ui.com/)

## Features

- 🚀 Server side rendering application
- 🏳‍🌈 Internationalization
- 🚀 Progressive web app
- 💯 High Lighthouse scores
- ✅ Cache control
- 🚀 SEO optimized
- ✅ Twitter Cards meta
- ✅ OpenGraph structured data
- 📦 Uses the popular, well-maintained Material UI React component library
- 🚀 Styles optimized (postcss, clean-css)

## Quick Start

```bash
# Install dependencies
npm install

# Log in to firebase account
node_modules/.bin/firebase login

# Choose a firebase project
node_modules/.bin/firebase use <project_id>

# Build
npm run build-all

# Run in dev mode
npm run dev

# Deploy locally
npm run serve

# Deploy to firebase
npm run deploy-<dev|stag|prod>
```

## Configuration

_Firebase configuration_ :

- Log in to your firebase account with the command `node_modules/.bin/firebase login`.
- Update the file `.firebaserc` with your own firebase projects id. You can get them using `node_modules/.bin/firebase projects:list`.
- Add your Firebase project configurations in `/src/app/utils/firebase.js`.

  _Common configurations_ (`/src/app`) :

- You can configure somes in the folder `utils` : the common config of the application in `config.js`, the material-ui themes in the folder `theme`.
- To configure the localization, update `locales.json`. The locale path folder is at `utils/locales/`.

  _Internationalization_ (`/src/app`):

- The locale is implemented manually in the style of [react-i18next](https://react.i18next.com/). The locales can be configured with `locales.json`.
- The locale folder is located in `utils/locales/`.
- We attribute for each page a key to identify it in the locale resources. This keys are specified in `locales.json`.
