import { Router } from "express";
import { AuthenticateUserController } from "./controller/AuthenticateUserController";
import { CreateMessageController } from "./controller/CreateMessageController";
import { GetLast3MessagesController } from "./controller/GetLast3MessagesController";
import { UserProfileController } from "./controller/UserProfileController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);

router.post("/messages", ensureAuthenticated , new CreateMessageController().handle);

router.get("/messages/recently", new GetLast3MessagesController().handle);

router.get("/profile", ensureAuthenticated, new UserProfileController().handle);

export { router };