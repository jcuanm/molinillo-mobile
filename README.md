# molinillo-mobile
A React Native Expo project that allows the user to create an account, login/out, and scan barcodes to get information on an item. It uses Firestore's NoSQL database schema as the backend and Algolia to parse the Firestore database for searching capabilities.

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
   
6. Install the Expo CLI so that we can run our code in a controlled environment and run our phone emulators more easily. 

   * This project uses Expo CLS version `2.6.8` (check out [this website](https://inglife.code.blog/2019/05/12/how-to-install-expo-cli-in-linux/) to see how to install on Ubuntu)

7. Install `npm` for your terminal/command prompt 

   * This project uses 'npm' version `6.8.0`
   
8. Run `npm i` in your root directory to install all of the relevant node modules

9. Run `npm start` to run the project

9. Press either `a` or `i` to run either an Android or iPhone emulator respectively. Or you could download the Expo App from the app store and run the application on your own mobile device.
