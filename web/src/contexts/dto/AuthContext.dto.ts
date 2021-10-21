import { UserDTO } from "./User.dto";

export class AuthContextDTO {

  user!: UserDTO | null; // null para caso o usuario não esteja auth
  signInUrl!: string;
  signOut!: () => void;

}