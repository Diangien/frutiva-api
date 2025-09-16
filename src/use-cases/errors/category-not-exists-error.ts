export class CategoryNotExistsError extends Error{
    constructor(){
        super("Category Not Exists");
    }
}