# molinillo-mobile
A React Native project that allows the user to create an account, login/out, and scan barcodes to get information on an item.

# How to Run
1. Clone this repo into the directory of your choosing 
2. Create an 'assets/config/FirebaseConfig.js' file
⋅⋅* This file will contain the credentials for a Firestore NoSQL database
3. [Create a Firebase account](https://firebase.google.com/) and follow the directions for setting up a Firestore database
4. Paste your Firestore credentials into the 'assets/config/FirebaseConfig.js' file in a format such as the one that follows:

```javascript
export default {
  FirebaseConfig: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  }
}
```

5. Install the Expo CLS so that we can run our code in a controlled environment and run our phone emulators easier
⋅⋅* This project uses Expo CLS version '2.6.8'
6. Install 'npm' for your terminal/command prompt 
⋅⋅* This project uses 'npm' version '6.7.0'
7. Run 'npm i' in your root directory to install all of the relevant node modules
8. Press either 'a' or 'i' to run either an Android or iPhone emulator respectively. Or you could download the Expo App from the app store and run the application on your own phone.
