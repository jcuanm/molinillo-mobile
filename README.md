# molinillo-mobile
A React Native Expo project that allows the user to interact with ethical fine chocolate. It uses Firestore's NoSQL database schema as the backend and Algolia to parse the Firestore database for searching capabilities.

# How to Run
1. Clone this repo into the directory of your choosing 
2. Create an `assets/Config.js` file

   * This file will contain the credentials for a Firestore NoSQL database as well as those for our Algolia search engine

3. [Create a Firebase account](https://firebase.google.com/) and follow the directions for setting up a Firestore database.
4. [Create an Algolia account](https://www.algolia.com/) and follow the directions for setting up an Algolia account
5. Paste your credentials into the `assets/Config.js` file in a format such as the one that follows:

```javascript
export const FirebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
}

export const AlgoliaSearchConfig = {
  apiKey: "",
  applicationID: "",
  indexName: ""
}
```
   * To find where in your Firebase account you can find the credentials for your Firestore database, follow the directions in this link https://support.google.com/firebase/answer/7015592?hl=en under the section "Get config object for your web app". NOTE: The instructions for finding credentials for a Firebase web app are the same as those for a mobile app.
   * You can find your Algolia account credentials for your search index under the "API keys" section. Make sure to use the admin apiKey. NOTE: Your index name is the name of the storage unit where you will be holding all of your searchable data.
   


6. Install `npm` for your terminal/command prompt 

   * This project uses 'npm' version `6.10.0`
   
7. Install the Expo CLI so that we can run our code in a controlled environment and run our phone emulators more easily. 

   * This project uses Expo CLS version `2.21.1` (check out [this website](https://inglife.code.blog/2019/05/12/how-to-install-expo-cli-in-linux/) to see how to install on Ubuntu)
   
8. Run `npm i` in your root directory to install all of the relevant node modules

9. Run `npm start` to run the project
  * NOTE: If your project can't find expo, try the instructions on this link: https://stackoverflow.com/questions/33725639/npm-install-g-less-does-not-work

10. Press either `a` or `i` to run either an Android or iPhone emulator respectively. Or you could download the Expo App from the app store and run the application on your own mobile device.

  * NOTES: An android emulator must be running already before you press `a`. If you're having issues with the ios emulator, try waiting for the emulator to finish loading up and then press `i` wen it is loaded.
  

# Deploying

# Android
Before deploying, make sure you increment the `versionCode` in `app.json`! In order to get the binary to upload to the Google Play store, run the following command:

`expo build:android -t app-bundle`

# iOS
Before deploying, make sure you increment the `buildNumber` in `app.json`! In order to get the binary to upload to the iOS store, run the following command:

`expo build:ios`

# Instructions for both Android and iOS 
Let Expo handle everything; don't manually create any keys of any kind.
