import {  StringConcatenations } from '../helpers/Constants';
import * as firebase from 'firebase';
import Constants from '../helpers/Constants';
import 'firebase/firestore';

export default class DbHandler{
    constructor(){
        this.dbRef = firebase.firestore();
        this.currUser = firebase.auth().currentUser;
        this.executeSuccessCallback = this.executeSuccessCallback.bind(this); 
    }

    // For testing purposes
    addData(){
        this.dbRef
            .collection('BarcodeType_Upc_a')
            .doc('036000291452')
            .set( { barcodeType : 'Upc_a' , barcodeData : '036000291452', confectionName : 'Javier'});
        
        this.dbRef
            .collection('BarcodeType_Code128')
            .doc(']C1Wikipedia')
            .set( { barcodeType : 'Code128' , barcodeData : ']C1Wikipedia', confectionName : 'wiki'});
    }

    loginUser(email, password){
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {})
            .catch( error => { 
                console.log(error);
                alert("We couldn't log you in! There was a connection error.");
            });  
    }

    signupUser(email, password, passwordConfirm){
        if(password !== passwordConfirm){
            alert(Constants.PasswordsDontMatch);
            return;
        }

        // Limited to email and password with this implementation
        // Add other user data using createUser() method
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then()
            .catch(error => { 
                console.log(error);
                alert("Sorry! We couldn't sign you up. There was a connection error."); 
            });
    }

    getData(dbRef, callbacksAndParams){
        return dbRef
            .get()
            .then(results => {
                if(results.exists){
                    callbacksAndParams.params['results'] = results;
                    return this.executeSuccessCallback(callbacksAndParams.handleSuccessCallback, callbacksAndParams.params);
                }
                else{
                    return this.executeFailureCallback(callbacksAndParams.handleFailureCallback, callbacksAndParams.params);
                }
            })
            .catch(error => {
                alert("We're having trouble connecting.");
                console.log("Error!: ", error);
            });
    }

    deleteItem(dbRef, callbacksAndParams){
        return dbRef
            .delete()
            .then( _ => {
                let myChocolatesRef = this.getRef("MyChocolates");
                let barcodeToDelete = callbacksAndParams.params;
                this.deleteFieldFromDocument(myChocolatesRef, barcodeToDelete);
                this.executeSuccessCallback(callbacksAndParams.handleSuccessCallback, callbacksAndParams.params);
            })
            .catch(error => {
                console.log(error);
                alert("Error deleting item"); 
            });
    }

    deleteFieldFromDocument(dbRef, barcodeToDelete){
		try{
			dbRef.update({
				[barcodeToDelete.data] : firebase.firestore.FieldValue.delete(),
			});
		}
		catch{
			console.log("Could not delete field in document from myChocolates collection: ", barcodeToDelete);
		}
	}

    executeSuccessCallback(handleSuccessCallback, callbackParams){
        return handleSuccessCallback({ results: callbackParams.results, params: callbackParams });
    }
    
    executeFailureCallback(handleFailureCallback, callbackParams){
        return handleFailureCallback({ params: callbackParams});
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