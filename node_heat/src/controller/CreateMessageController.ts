import { Request, Response } from "express";
import { CreateMessageService } from "../service/CreateMessageService";

class CreateMessageController {

  public async handle( req: Request, res: Response ) : Promise<any> {

    const { message } = req.body;
    const { user_id } = req;

    const service = new CreateMessageService();

    const result = await service.execute(message, user_id);

    return res.json(result);

  }

};

export { CreateMessageController };