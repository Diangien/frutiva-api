export class ResourceNotFoundError extends Error{
    constructor(name:string = ""){
        super(`Resource ${name} Not Found`);
    }
}