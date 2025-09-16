export class ProductNameAlreadyExistsError extends Error{
    constructor(){
        super("Product name already exists")
    }
}