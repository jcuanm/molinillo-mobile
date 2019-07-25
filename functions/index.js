// This file contains the Firebase cloud functions necessary to keep our Algolia and Firestore
// databases in sync. These functions must be uploaded to our Firebase account by execurting the 
// following:
//
//            firebase deploy --only functions
//

/////////////////////
// Initializations //
/////////////////////

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');
const env = functions.config();

admin.initializeApp();

const db = admin.firestore();
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('dev_molinillo');


////////////////////////
// Firebase Functions //
////////////////////////

////// Algolia barcode Listeners ///////

//Upc_a
exports.index_Upc_a = functions.firestore
  .document('BarcodeType_Upc_a/{barcodeData}')
  .onCreate(document => {
    const data = document.data();
    const objectID = data.uuid;
    return index.addObject({
      objectID: objectID,
      ...data
    });
  });

exports.update_Upc_a = functions.firestore
  .document('BarcodeType_Upc_a/{barcodeData}')
  .onUpdate((change, context) => {
    const previousDocument = change.before;
    const currentDocument = change.after;
    if(!previousDocument || !currentDocument){
      return;
    }
    const data = currentDocument.data();
    const objectID = data.uuid;
    return index.partialUpdateObject({
      objectID: objectID,
      ...data
    });
  });

exports.unindex_Upc_a = functions.firestore
  .document('BarcodeType_Upc_a/{barcodeData}')
  .onDelete(document => {
    const objectID = document.data().uuid;
    return index.deleteObject(objectID);
  });

//Upc_e
exports.index_Upc_e = functions.firestore
  .document('BarcodeType_Upc_e/{barcodeData}')
  .onCreate(document => {
    const data = document.data();
    const objectID = data.uuid;
    return index.addObject({
      objectID: objectID,
      ...data
    });
  });

exports.update_Upc_e = functions.firestore
  .document('BarcodeType_Upc_e/{barcodeData}')
  .onUpdate((change, context) => {
    const previousDocument = change.before;
    const currentDocument = change.after;
    if(!previousDocument || !currentDocument){
      return;
    }
    const data = currentDocument.data();
    const objectID = data.uuid;
    return index.partialUpdateObject({
      objectID: objectID,
      ...data
    });
  });

exports.unindex_Upc_e = functions.firestore
  .document('BarcodeType_Upc_e/{barcodeData}')
  .onDelete(document => {
    const objectID = document.data().uuid;
    return index.deleteObject(objectID);
  });

//Ean8
exports.index_Ean8 = functions.firestore
  .document('BarcodeType_Ean8/{barcodeData}')
  .onCreate(document => {
    const data = document.data();
    const objectID = data.uuid;
    return index.addObject({
      objectID: objectID,
      ...data
    });
  });

exports.update_Ean8 = functions.firestore
  .document('BarcodeType_Ean8/{barcodeData}')
  .onUpdate((change, context) => {
    const previousDocument = change.before;
    const currentDocument = change.after;
    if(!previousDocument || !currentDocument){
      return;
    }
    const data = currentDocument.data();
    const objectID = data.uuid;
    return index.partialUpdateObject({
      objectID: objectID,
      ...data
    });
  });

exports.unindex_Ean8 = functions.firestore
  .document('BarcodeType_Ean8/{barcodeData}')
  .onDelete(document => {
    const objectID = document.data().uuid;
    return index.deleteObject(objectID);
  });

//Ean13
exports.index_Ean13 = functions.firestore
  .document('BarcodeType_Ean13/{barcodeData}')
  .onCreate(document => {
    const data = document.data();
    const objectID = data.uuid;
    return index.addObject({
      objectID: objectID,
      ...data
    });
  });

exports.update_Ean13 = functions.firestore
  .document('BarcodeType_Ean13/{barcodeData}')
  .onUpdate((change, context) => {
    const previousDocument = change.before;
    const currentDocument = change.after;
    if(!previousDocument || !currentDocument){
      return;
    }
    const data = currentDocument.data();
    const objectID = data.uuid;
    return index.partialUpdateObject({
      objectID: objectID,
      ...data
    });
  });
  
exports.unindex_Ean13 = functions.firestore
  .document('BarcodeType_Ean13/{barcodeData}')
  .onDelete(document => {
    const objectID = document.data().uuid;
    return index.deleteObject(objectID);
  });

//Code39
exports.index_Code39 = functions.firestore
  .document('BarcodeType_Code39/{barcodeData}')
  .onCreate(document => {
    const data = document.data();
    const objectID = data.uuid;
    return index.addObject({
      objectID: objectID,
      ...data
    });
  });

exports.update_Code39 = functions.firestore
  .document('BarcodeType_Code39/{barcodeData}')
  .onUpdate((change, context) => {
    const previousDocument = change.before;
    const currentDocument = change.after;
    if(!previousDocument || !currentDocument){
      return;
    }
    const data = currentDocument.data();
    const objectID = data.uuid;
    return index.partialUpdateObject({
      objectID: objectID,
      ...data
    });
  });

exports.unindex_Code39 = functions.firestore
  .document('BarcodeType_Code39/{barcodeData}')
  .onDelete(document => {
    const objectID = document.data().uuid;
    return index.deleteObject(objectID);
  });

//Code128
exports.index_Code128 = functions.firestore
  .document('BarcodeType_Code128/{barcodeData}')
  .onCreate(document => {
    const data = document.data();
    const objectID = data.uuid;
    return index.addObject({
      objectID: objectID,
      ...data
    });
  });

exports.update_Code128 = functions.firestore
  .document('BarcodeType_Code128/{barcodeData}')
  .onUpdate((change, context) => {
    const previousDocument = change.before;
    const currentDocument = change.after;
    if(!previousDocument || !currentDocument){
      return;
    }
    const data = currentDocument.data();
    const objectID = data.uuid;
    return index.partialUpdateObject({
      objectID: objectID,
      ...data
    });
  });

exports.unindex_Code128 = functions.firestore
  .document('BarcodeType_Code128/{barcodeData}')
  .onDelete(document => {
    const objectID = document.data().uuid;
    return index.deleteObject(objectID);
  });

//Itf14
exports.index_Itf14 = functions.firestore
  .document('BarcodeType_Itf14/{barcodeData}')
  .onCreate(document => {
    const data = document.data();
    const objectID = data.uuid;
    return index.addObject({
      objectID: objectID,
      ...data
    });
  });

exports.update_Itf14 = functions.firestore
  .document('BarcodeType_Itf14/{barcodeData}')
  .onUpdate((change, context) => {
    const previousDocument = change.before;
    const currentDocument = change.after;
    if(!previousDocument || !currentDocument){
      return;
    }
    const data = currentDocument.data();
    const objectID = data.uuid;
    return index.partialUpdateObject({
      objectID: objectID,
      ...data
    });
  });

exports.unindex_Itf14 = functions.firestore
  .document('BarcodeType_Itf14/{barcodeData}')
  .onDelete(document => {
    const objectID = document.data().uuid;
    return index.deleteObject(objectID);
  });

//Codabar
exports.index_Codabar = functions.firestore
  .document('BarcodeType_Codabar/{barcodeData}')
  .onCreate(document => {
    const data = document.data();
    const objectID = data.uuid;
    return index.addObject({
      objectID: objectID,
      ...data
    });
  });

exports.update_Codabar = functions.firestore
  .document('BarcodeType_Codabar/{barcodeData}')
  .onUpdate((change, context) => {
    const previousDocument = change.before;
    const currentDocument = change.after;
    if(!previousDocument || !currentDocument){
      return;
    }
    const data = currentDocument.data();
    const objectID = data.uuid;
    return index.partialUpdateObject({
      objectID: objectID,
      ...data
    });
  });

exports.unindex_Codabar = functions.firestore
  .document('BarcodeType_Codabar/{barcodeData}')
  .onDelete(document => {
    const objectID = document.data().uuid;
    return index.deleteObject(objectID);
  });

//Code93
exports.index_Code93 = functions.firestore
  .document('BarcodeType_Code93/{barcodeData}')
  .onCreate(document => {
    const data = document.data();
    const objectID = data.uuid;
    return index.addObject({
      objectID: objectID,
      ...data
    });
  });

exports.update_Code93 = functions.firestore
  .document('BarcodeType_Code93/{barcodeData}')
  .onUpdate((change, context) => {
    const previousDocument = change.before;
    const currentDocument = change.after;
    if(!previousDocument || !currentDocument){
      return;
    }
    const data = currentDocument.data();
    const objectID = data.uuid;
    return index.partialUpdateObject({
      objectID: objectID,
      ...data
    });
  });

exports.unindex_Code93 = functions.firestore
  .document('BarcodeType_Code93/{barcodeData}')
  .onDelete(document => {
    const objectID = document.data().uuid;
    return index.deleteObject(objectID);
  });


////// Detail Screen Listeners //////

// StarRatingsPerUser
exports.index_StarRatingsCountListener = functions.firestore
  .document('StarRatingsPerUser/{starId}')
  .onCreate(document => {
    const data = document.data();
    const path = "BarcodeType_" + data.barcodeType + "/" + data.barcodeData.toString();

    return db
      .doc(path)
      .update({numStarRatings: admin.firestore.FieldValue.increment(1)});
  });

exports.unindex_StarRatingsCountListener = functions.firestore
  .document('StarRatingsPerUser/{starId}')
  .onDelete(document => {
    const data = document.data();
    const path = "BarcodeType_" + data.barcodeType + "/" + data.barcodeData.toString();

    return db
      .doc(path)
      .update({numStarRatings:  admin.firestore.FieldValue.increment(-1)});
  });
