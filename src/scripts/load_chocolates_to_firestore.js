const firebase = require("firebase");
const uuidv4 = require('uuid/v4');
const {Storage} = require('@google-cloud/storage');
const mime = require('mime');


// Required for side-effects
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

const keyFilename="./molinillo-4e7c5-firebase-adminsdk-s30dx-216a7f53f7.json"; //replace this with api key file
const projectId = "molinillo-4e7c5" //replace with your project id
const bucketName = `${projectId}.appspot.com`;

const gcs = new Storage({
    projectId,
    keyFilename
});

const bucket = gcs.bucket(bucketName);
  
var chocolates_without_barcodes =[  
    {  
       "confectionName": "Test 1",
       "producerName": "Test Producer 1",
       "cacaoPercentage": "9",
       "countryOfOrigin": "MEXICO",
       "cacaoVariety": "Forastero",
       "confectionDescription": "This is a test of a chocolate with no barcode!",
       "imageUri": "./cacao-pod.jpg",
       "vendorAddress": "11 Seckel St., Apt. 2, Cambridge, MA 02141",
       "vendorUrl": "https://www.facebook.com"
    },
    {  
        "confectionName": "Test 2",
        "producerName": "Test Producer 2",
        "countryOfOrigin": "MEXICO",
        "cacaoPercentage": "96",
        "cacaoVariety": "Criollo",
        "imageUri": "./cacao-pod.jpg",
        "confectionDescription": "This is a test of a chocolate with no barcode!",
        "vendorAddress": "11 Seckel St., Apt. 2, Cambridge, MA 02141",
        "vendorUrl": "https://www.facebook.com"
    }
 ]

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

function createPublicFileURL(storageName) {
    return `http://storage.googleapis.com/${bucketName}/${encodeURIComponent(storageName)}`;
}
