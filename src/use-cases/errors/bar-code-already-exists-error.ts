export class BarCodeAlreadyExistsError extends Error{
    constructor(){
        super("Barcode already exists")
    }
}