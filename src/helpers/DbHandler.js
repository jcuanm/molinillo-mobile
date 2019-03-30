import {  StringConcatenations } from '../helpers/Constants';
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

        // Limited to email and password with this implementation
        // Add other user data using createUser() method
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then()
            .catch( err => { 
                console.log(err);
                alert(err.message); 
            });
    }

    getData(ref, successCallback, successCallbackParams, errorFunc, errorFuncParams){
        return ref
            .get()
            .then(results => {
                return successCallback(results, successCallbackParams);
            })
            .catch(err => {
                return errorFunc(err, errorFuncParams);
            });
    }

    getRef(root, barcodeType = null, barcodeData = null){
        var ref;
        switch(root){
            case 'users':
                ref = this.dbRef
                    .collection(root)
                    .doc(this.currUser.uid);
                break;
            case StringConcatenations['Prefix']:
                ref = this.dbRef
                    .collection(root + barcodeType)
                    .doc(barcodeData.toString());
                break;
            case 'MyChocolates':
                ref = this.dbRef
                    .collection(root)
                    .doc(this.currUser.uid);
                break;
            default:
                ref = null; 
        }
        return ref;
    }
}