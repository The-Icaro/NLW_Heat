import { Request, Response } from "express";
import { GetLast3MessagesService } from "../service/GetLast3MessagesService";


class GetLast3MessagesController {

  public async handle( req: Request, res: Response ) : Promise<any> {

    const service = new GetLast3MessagesService();

    const result = await service.execute();

    return res.json(result);

  }

};

export { GetLast3MessagesController };