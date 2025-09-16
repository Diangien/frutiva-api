export class UserNotExistsError extends Error{
    constructor(){
        super("User Not Exists");
    }
}