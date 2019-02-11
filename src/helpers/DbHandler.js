import { Collections } from './Constants';
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class DbHandler{
    constructor(){
        this.dbRef = firebase.firestore();
        this.currUser = firebase.auth().currentUser;
    }

    loginUser(email, password){
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
            .then(() => {})
            .catch( error => { 
                console.log(error);
                alert(error.message)} 
            );  
    }

    signupUser(email, password, passwordConfirm){
        if(password !== passwordConfirm){
            alert("Passwords do not match");
            return;
        }

        // Limited by email and password with this implementation
        // Add other user data using createUser() method
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then()
            .catch( error => { 
                console.log(error);
                alert(error.message); 
            });
    }

    getRef(root, barcodeType = null, barcodeData = null){
        var ref;
        switch(root){
            case Collections['users']:
                ref = this.dbRef
                    .collection(Collections['users'])
                    .doc(this.currUser.uid);
                break;
            case Collections['confections']:
                ref = this.dbRef
                    .collection(Collections['confections'])
                    .doc(barcodeType.toString())
                    .collection(Collections["barcodeData"])
                    .doc(barcodeData.toString());
                break;
            case Collections['myChocolates']:
                ref = this.dbRef
                    .collection(Collections['myChocolates'])
                    .doc(this.currUser.uid)
                    .collection(barcodeType.toString())
                    .doc(barcodeData.toString());
                break;
            default:
                ref = null; 
        }
        return ref;
    }
}