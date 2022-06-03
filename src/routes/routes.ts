import { Router } from "express";
import { TweetsController } from "../controllers/Tweets.controller";
import { UserController } from "../controllers/Users.controller";

const routes = Router();

routes.get("/", (_, response) => {
  response.send("<h1>Whyy</h1>");
});

routes.post("/tweets", TweetsController.create);
routes.get("/tweets", TweetsController.getAll);
routes.post("/create", UserController.create);
routes.post("/signup", UserController.login);

export { routes };
