import { Request, Router } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Writable } from "stream";
import { ZodType } from "zod";

declare global {
  interface Config {
    root: string;
    db: PrismaClient | DeepMockProxy<PrismaClient>;
    logs: {
      stream?: Writable;
      local: {
        root: string;
        file?: string;
      };
    };
  }

  type HandledController<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any
      ? (...args: Parameters<T[K]>) => ReturnType<T[K]> | null
      : T[K];
  };

  interface Controller<T extends Record<String, Function>> {
    (args: System): HandledController<T>;
  }

  interface Route<C> {
    status: {
      code: typeof StatusCodes;
      reason: typeof ReasonPhrases;
    };
    response: ServerResponse,
    router: Router;
    auth: Authentication;
    controller: HandledController<C>;
    allow: (typeof AccessPolicyGenerator & RequestHandlerParams<any>);
    validate: RequestHandlerParams<any>;
    logger: SystemLogger
  }

  interface RouteComponents {
    path: string;
    schema?: ValidationSchema;
    io: (opts: Route<any>) => void;
    controller: any;
  }

  interface Server {
    app: Application;
    listen: () => void;
  }

  interface SystemLogin {
    id: number;
    groups: Array<number>;
    username?: string;
    password?: String;
  }

  interface ClientRequest extends Request {
    login?: AuthTokenPayload | null;
    params?: {
      uid?: number; // user id or something of the kind
      [key: string]: any;
    };
  }

  interface Middleware {
    (req: ClientRequest, res: Response, next: NextFunction): any;
  }


  interface System {
    db: PrismaClient;
    server: Server;
    auth: Authentication;
    scope: AwilixContainer<System>;
    routes: Array<RouteComponents>;
    utils: UtilityFunctions;
    logger: SystemLogger;
    seeder: Function;
    [key: string | symbol]: any;
  }

  interface ValidationSchema {
    [key: string]: ZodType;
  }
}
