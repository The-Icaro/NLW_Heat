export class AuthenticateUserDTO {

  token!: string;
  
  user!: {
    id: string;
    name: string;
    avatar_url: string;
    login: string;
  }

}