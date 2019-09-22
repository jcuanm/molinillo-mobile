const firebase = require("firebase");
const uuidv4 = require('uuid/v4');
const {Storage} = require('@google-cloud/storage');
const mime = require('mime');
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "***",
    authDomain: "***",
    databaseURL: "***",
    projectId: "***",
    storageBucket: "***",
    messagingSenderId: "***",
    appId: "***"
});

var db = firebase.firestore();

const keyFilename = "***";
const projectId = "***";
const bucketName = `${projectId}.appspot.com`;

const gcs = new Storage({
    projectId,
    keyFilename
});

// Reference to Google Storage bucket for image loading
const bucket = gcs.bucket(bucketName);
  
var chocolates_without_barcodes =[  

    // Example payload
    {  
        "confectionName": "Guatemala 73%",
        "producerName": "French Broad Chocolate",
        "cacaoPercentage": "73",
        "countryOfOrigin": "GUATEMALA",
        "cacaoVariety": "Unknown",
        "confectionDescription": "Deep in the foothills of northern Guatemala lies the village of Rocjá Pomtilá, a settlement of Maya Q’eqchi’ who cultivate cacao, cardamom, and maize. Their cacao has only recently become commercially available, thanks to the efforts of a truly extraordinary organization, Uncommon Cacao. The audacious proposition of Uncommon Cacao is that with education, organization and fair treatment, the cacao farmers can substantially improve their livelihoods. Their mission is to create a sustainable, prosperous cacao industry in which farmers and chocolate makers thrive together.\n\nThis bar contains 73 percent cacao and offers flavors of concord grape, fresh-baked brownies, and almond butter.\n\nIngredients: Guatemalan cacao beans, organic sugar.\n\nThis chocolate bar is dairy-free and suitable for vegans.",
        "imageUri": "./images/french_broad_.png",
        "vendorAddress": "821 Riverside AveMedford, MA 02155",
        "vendorUrl": "https://www.frenchbroadchocolates.com"
    }
];


// We need to impersonate a user in order to edit the database
firebase
    .auth()
    .signInWithEmailAndPassword("***", "***")
    .then( _ => {
        chocolates_without_barcodes.forEach(function(obj) {
            const uuid = uuidv4();
            const filePath = obj.imageUri;
            const uploadTo = "NoBarcode/" + uuid;
            const fileMime = mime.getType(filePath);
        
            bucket.upload(filePath,{
                destination:uploadTo,
                public:true,
                metadata: {contentType: fileMime, cacheControl: "public, max-age=300"}
            }, function(err, file) {
                if(err)
                {
                    console.log(err);
                    return;
                }
                else{
                    db
                        .collection("BarcodeType_NoBarcode")
                        .doc(uuid)
                        .set({
                            uuid: uuid,
                            confectionName: obj.confectionName,
                            countryOfOrigin: obj.countryOfOrigin,
                            producerName: obj.producerName,
                            cacaoPercentage: obj.cacaoPercentage,
                            cacaoVariety: obj.cacaoVariety,
                            confectionDescription: obj.confectionDescription,
                            vendorAddress: obj.vendorAddress,
                            vendorUrl: obj.vendorUrl,
                            imageDownloadUrl: createPublicFileURL(uploadTo),
                            barcodeType: "None",
                            barcodeData: "None"
                        }).then(function(docRef) {
                            console.log("Document written");
                        })
                        .catch(function(error) {
                            console.error("Error adding document: ", error);
                        });
                }
            });
        });

        firebase.auth().signOut();
    })
    .catch( error => { 
        console.log(error);
    });  

function createPublicFileURL(storageName) {
    return `http://storage.googleapis.com/${bucketName}/${encodeURIComponent(storageName)}`;
}

// chocolates_without_barcodes.forEach(function(obj) {
//     const uuid = uuidv4();
//     const filePath = obj.imageUri;
//     const uploadTo = "NoBarcode/" + uuid;
//     const fileMime = mime.getType(filePath);

//     bucket.upload(filePath,{
//         destination:uploadTo,
//         public:true,
//         metadata: {contentType: fileMime, cacheControl: "public, max-age=300"}
//     }, function(err, file) {
//         if(err)
//         {
//             console.log(err);
//             return;
//         }
//         else{
//             db
//                 .collection("BarcodeType_NoBarcode")
//                 .doc(uuid)
//                 .set({
//                     uuid: uuid,
//                     confectionName: obj.confectionName,
//                     countryOfOrigin: obj.countryOfOrigin,
//                     producerName: obj.producerName,
//                     cacaoPercentage: obj.cacaoPercentage,
//                     cacaoVariety: obj.cacaoVariety,
//                     confectionDescription: obj.confectionDescription,
//                     vendorAddress: obj.vendorAddress,
//                     vendorUrl: obj.vendorUrl,
//                     imageDownloadUrl: createPublicFileURL(uploadTo),
//                     barcodeType: "None",
//                     barcodeData: "None"
//                 }).then(function(docRef) {
//                     console.log("Document written");
//                 })
//                 .catch(function(error) {
//                     console.error("Error adding document: ", error);
//                 });
//         }
//     });
// });

// function createPublicFileURL(storageName) {
//     return `http://storage.googleapis.com/${bucketName}/${encodeURIComponent(storageName)}`;
// }
