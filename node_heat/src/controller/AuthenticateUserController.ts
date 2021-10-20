import { Request, Response } from "express";
import { AuthenticateUserService } from "../service/AuthenticateUserService";

class AuthenticateUserController {

  public async handle( req: Request, res: Response ) : Promise<any> {

    const { code } = req.body;

    const authService = new AuthenticateUserService();

    try {

      const authResult = await authService.execute(code);
      return res.json(authResult);

    } catch (error : any) {

      return res.status(401).json({error : error.message})
    }
    

  }

};

export { AuthenticateUserController };