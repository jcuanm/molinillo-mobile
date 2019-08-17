import {  StringConcatenations, Warnings } from '../helpers/Constants';
import * as firebase from 'firebase';
import 'firebase/firestore';
const uuidv4 = require('uuid/v4');

export default class DbHandler{
    constructor(){
        this.dbRef = firebase.firestore();
        this.currUser = firebase.auth().currentUser;
        this.executeSuccessCallback = this.executeSuccessCallback.bind(this); 
    }

    loginUser(email, password){
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch( error => { 
                console.log(error);
                alert(error);
            });  
    }

    signupUser({ email, displayName, password, passwordConfirm }){
        if(password !== passwordConfirm){
            alert(Warnings.PasswordsDontMatch);
            return;
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then( userMetaData => {
                userMetaData.user.updateProfile({ displayName : displayName });
            })
            .catch(error => { 
                alert(error); 
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

    setData(rootName, inputData){
        let ref = this.getRef(rootName);
        ref.set(inputData);
    }
    
    incrementValue(rootName, fieldname, amount, barcode=null, uuid=null){
        let ref = this.getRef(rootName, barcode, uuid);
        let increment = firebase.firestore.FieldValue.increment(amount);
        try{
            ref.update({ [fieldname] : increment });
        }
        catch(error){
            console.log(error);
            console.log("Could not update field!");
        }  
    }

    executeSuccessCallback(handleSuccessCallback, callbackParams){
        return handleSuccessCallback({ results: callbackParams.results, params: callbackParams });
    }
    
    executeFailureCallback(handleFailureCallback, callbackParams){
        return handleFailureCallback({ params: callbackParams});
    }

    getRef(root, barcode=null, barcodeUuid=null, commentUuid=null){
        var ref;
        switch(root){
            case StringConcatenations.Prefix:
                if(barcode.type !== "None" && barcode.data !== "None"){
                    ref = this.dbRef
                        .collection(root + barcode.type)
                        .doc(barcode.data.toString());
                }
                else{
                    ref = this.dbRef
                        .collection(root + "NoBarcode")
                        .doc(barcodeUuid);
                }
                break;
            case 'Possible' + StringConcatenations.Prefix:
                ref = this.dbRef
                    .collection(root + barcode.type)
                    .doc(barcode.data.toString());
                break;
            case 'MyChocolates':
                ref = this.dbRef
                    .collection(root)
                    .doc(this.currUser.uid + "_" + barcodeUuid);
                break;
            case 'Scans':
                ref = this.dbRef
                    .collection(root)
                    .doc(uuidv4());
                break;
            case 'SearchClicks':
                ref = this.dbRef
                    .collection(root)
                    .doc(uuidv4());
                break;
            case 'StarRatingsPerUser':
                ref = this.dbRef
                    .collection(root)
                    .doc(this.currUser.uid + "_" + barcodeUuid);
                break;
            case 'Comments':
                ref = this.dbRef
                    .collection(root)
                    .doc(barcodeUuid)
                    .collection("ratings")
                    .doc(commentUuid);
                break;
            case 'Feedback':
                ref = this.dbRef
                    .collection(root)
                    .doc(uuidv4());
                break;
            default:
                ref = null; 
        }
        return ref;
    }
}