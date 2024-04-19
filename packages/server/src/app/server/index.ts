import bodyParser from "body-parser";
import cookie from "cookie-parser";
import cors from "cors";
import express, { Router } from "express";
import helmet from "helmet";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import morgan from "morgan";
import { nullifyBody, validateRequestBody } from "./middleware.js";
import createServerResponses from "./responses.js";

const app = express();

/* security middleware */
app.use(helmet());

/* logging middleware */
app.use(morgan("tiny"));

/* body parser */
app.use(bodyParser.json());

/* cookie parser */
app.use(cookie());

/* nullify body if empty */
app.use(nullifyBody);

/* Cors */
app.use(cors({
    origin: 'http://192.168.100.148:3000',
    // origin: 'http://localhost:3000',
    credentials: true,
}));

/* prevent caching */
app.disable("etag");

const Server = async ({ routes, auth, scope, logger }: System): Promise<Server> => {
  app.use(auth.decodeAuthToken as any);
  const response = createServerResponses({
        code: StatusCodes,
        reason: ReasonPhrases,
  })

  /* routes */
  routes.forEach(({ path, io, controller, schema }) => {
    const router = Router();
    const routeController = scope.resolve(controller);
    const validate = validateRequestBody(logger, schema);
    io({
      response,
      router,
      controller: routeController,
      validate,
      auth,
      allow: auth.allow,
      logger,
      status: {
        code: StatusCodes,
        reason: ReasonPhrases,
      },
    });
    app.use(path, router);
  });

  const port = process.env.HTTP_PORT || 3000;
  return {
    app,
    listen() {
      const server = app.listen(port, () => {
        console.log(`Started server on port ${port}!`);
      });
      return server;
    },
  };
};

export default Server;
