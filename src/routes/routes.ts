import { Router } from "express";
import { TweetsController } from "../controllers/Tweets.controller";
import { UserController } from "../controllers/Users.controller";

const routes = Router();

routes.get("/", (_, response) => {
  response.send("<h1>Whyy</h1>");
});

routes.post("/users", UserController.create);
routes.post("/tweets", TweetsController.create);

export { routes };
