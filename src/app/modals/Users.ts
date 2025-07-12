import { Roles } from "./Roles";


export interface Users {
    username: string;
    password: string;
    roles: Roles[];
    email  : string;
    firstname  : string;
    lastname  : string;
    mobile  : string;
    
}