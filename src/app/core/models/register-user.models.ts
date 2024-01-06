import {User} from "./user.models";

export class RegisterUser extends User{
  password!:string;
  confirmPassword!:string;
}
