import { RegularExpressions } from '../helpers/Constants';
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
            case 'users':
                ref = this.dbRef
                    .collection(root)
                    .doc(this.currUser.uid);
                break;
            case root.match(RegularExpressions['Prefix']) + barcodeType:
                ref = this.dbRef
                    .collection(root)
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