import { Request, Response } from "express";
import { UserProfileService } from "../service/UserProfileService";


class UserProfileController {

  public async handle( req: Request, res: Response ) : Promise<any> {

    const { user_id }= req;

    const service = new UserProfileService();

    const result = await service.execute(user_id);

    return res.json(result);

  }

};

export { UserProfileController };