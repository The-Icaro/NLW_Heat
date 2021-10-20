import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { UserPayloadDTO } from "./dto/UserPayload.dto";

export function ensureAuthenticated ( 
  req : Request, res : Response, next : NextFunction 
  ) {

    const authToken = req.headers.authorization;

    if (!authToken)
      return res.status(401).json({
        error : "token.invalid"
      });
    
    const [,token] = authToken.split(" ");

    const secretTk : any = process.env.JWT_SECRET;
    
    try {

      const { sub } = verify(token, secretTk) as UserPayloadDTO;

      req.user_id = sub;

      return next();

    } catch (error) {

      return res.status(401).json({
        error : "token.expired"
      });

    }



  }