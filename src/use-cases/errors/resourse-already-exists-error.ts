export class ResourceAlreadyExistsError extends Error{
    constructor(name:string = ""){
        super(`Resource ${name} already exists`);
    }
}