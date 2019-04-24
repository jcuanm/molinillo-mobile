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
                alert("Sorry! We couldn't log you in. There was a connection error.");
            });  
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
            .catch( error => { 
                console.log(error);
                alert("Sorry! We couldn't sign you up. There was a connection error."); 
            });
    }

    getData(dbRef, callbacksAndParams){
        return dbRef
            .get()
            .then(results => {
                if(results.exists){
                    return this.executeResultsFoundCallback(
                        results, 
                        callbacksAndParams.handleResultsFoundCallback, 
                        callbacksAndParams.params);
                }
                else{
                    return this.executeResultsNotFoundCallback(
                        callbacksAndParams.handleResultsNotFoundCallback, 
                        callbacksAndParams.params);
                }
            })
            .catch(error => {
                alert("Sorry! We we're having trouble connecting.");
                console.log("Error!: ", error);
            });
    }

    executeResultsFoundCallback(results, handleResultsFoundCallback, callbackParams){
        return handleResultsFoundCallback({ results: results, params: callbackParams });
    }
    
    executeResultsNotFoundCallback(handleResultsNotFoundCallback, callbackParams){
        return handleResultsNotFoundCallback({ params: callbackParams});
    }

    getRef(root, barcode = null){
        var ref;
        switch(root){
            case 'users':
                ref = this.dbRef
                    .collection(root)
                    .doc(this.currUser.uid);
                break;
            case StringConcatenations.Prefix:
                ref = this.dbRef
                    .collection(root + barcode.type)
                    .doc(barcode.data.toString());
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