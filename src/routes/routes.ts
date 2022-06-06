import { Router } from "express";
import { TweetsController } from "../controllers/Tweets.controller";
import { UserController } from "../controllers/Users.controller";
import { authorizationMiddleware } from "../middlewares/Authorization.middleware";

const routes = Router();

routes.get("/", (_, response) => {
  response.send("<h1>Whyy</h1>");
});

routes.post("/tweets", authorizationMiddleware, TweetsController.create);
routes.get("/tweets", authorizationMiddleware, TweetsController.getAll);
routes.post("/create", UserController.create);
routes.get("/user/:id", UserController.getUser);
routes.post("/signup", UserController.login);
routes.post("/image", authorizationMiddleware, UserController.updateImage);

export { routes };
