import "dotenv/config";
import axios from "axios";
import { AccessTokenDTO } from "./dto/AccessToken.dto";
import { UserDTO } from "./dto/User.dto";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";

class AuthenticateUserService {

  public async execute( code : string ) : Promise<any> {

    const tokenUrl = "https://github.com/login/oauth/access_token";

    const { data : accessTokenResponse } = await axios.post<AccessTokenDTO>( tokenUrl, null, {
      params: {
        client_id : process.env.GITHUB_CLIENT_ID,
        client_secret : process.env.GITHUB_CLIENT_SECRET,
        code
      },
      headers: {
        Accept : "application/json"
      }
    });  // Pegar o Token do Usuário

    const userUrl = "https://api.github.com/user"

    const res = await axios.get<UserDTO>( userUrl, {

      headers: {
        authorization : `Bearer ${accessTokenResponse.access_token}`
      }
    });

    // Check User no DB

    const { id, avatar_url, login, name } = res.data;
    let user = await prismaClient.user.findFirst({
      where : {
        github_id : id
      }
    })

    if (!user)
      user = await prismaClient.user.create({
        data : {
          github_id : id,
          avatar_url,
          login,
          name
        }
      });

    const secretTk : any = process.env.JWT_SECRET;
    
    const token = sign({
      user : {
        github_id : user.github_id,
        avatar_url : user.avatar_url,
        name : user.name
      },
    }, 
    secretTk,
    {
      subject : user.id,
      expiresIn : '1d'
    });

    return { token, user } ;  // No axios, chega um monte de info, o que queremos fica no data

  }

};

export { AuthenticateUserService };