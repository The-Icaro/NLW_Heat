export class MessageDTO {

  id!: string;
  text!: string;

  user!: {
    name: string;
    avatar_url: string;
  }

}