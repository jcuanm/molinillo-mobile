export const Warnings = {
    FailedToFindChocolate : "Sorry, we couldn\'t find this chocolate",
    HelpFindChocolate : "Help us out by adding this new chocolate to our database!"  
}

export const StringConcatenations = {
    Prefix: "BarcodeType_"
}

export const RegularExpressions = {
    Prefix: /^BarcodeType_/,
}

export const BarcodeTypeMappings = {
    512 : "Upc_a",
    1024 : "Upc_e",
    64 : "Ean8",
    32 : "Ean13",
    2 : "Code39",
    1 : "Code128",
    128 : "Itf14",
    8 : "Codabar",
    4 : "Code93",
}