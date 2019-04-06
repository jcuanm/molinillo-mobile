export default class Barcode{
  constructor(type, data){
    this.type = this.mapCodeToType(type);
    this.data = data;
  }

  mapCodeToType(barcodeTypeCode){
    var barcodeType;
    switch(barcodeTypeCode){
      case 512:
        barcodeType = "Upc_a";
        break;
      case 1024:
        barcodeType = "Upc_e";
        break;
      case 64:
        barcodeType = "Ean8";
        break;
      case 32:
        barcodeType = "Ean13";
        break;
      case 2:
        barcodeType = "Code39";
        break;
      case 1:
        barcodeType = "Code128";
        break;
      case 128:
        barcodeType = "Itf14";
        break;
      case 8:
        barcodeType = "Codabar";
        break;
      case 512:
        barcodeType = "Code93";
        break;
      default:
        barcodeType = barcodeTypeCode;

    }
    return barcodeType;
  }
}