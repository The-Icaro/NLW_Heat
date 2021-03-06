import "dotenv/config";

import express from 'express';
import { Request, Response } from 'express';

import http from "http";
import cors from "cors";
import { Server } from "socket.io";

import { router } from "./routes";

const app = express();
app.use(cors());

const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
  cors: {
    origin: '*'
  }
});

io.on("connection", (socket) => {
  console.log(`Usuário conectado no Socket ${socket.id}`)
})

app.use(express.json());

app.use(router);

app.get("/github", (req : Request, res : Response) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${
      process.env.GITHUB_CLIENT_ID
    }`);
});

app.get("/signin/callback", (req: Request, res: Response) => {

  const { code } = req.query;  // code -> nome do json
  
  return res.json(code);

});

export { serverHttp, io };
