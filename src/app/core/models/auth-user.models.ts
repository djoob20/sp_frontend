import {User} from "./user.models";

export class AuthUser extends User{
  imageUrl!:string;
  token!:string;
  isLoggedIn!:boolean;

}
