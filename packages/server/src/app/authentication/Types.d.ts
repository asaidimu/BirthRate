interface PasswordHashGenerator {
  (args: { password: string }): Promise<string>;
}

interface PasswordValidator {
  (args: { password: string; hash: string }): Promise<boolean>;
}

type AuthTokenPayload = SystemLogin & { exp: number };

interface AuthTokenValidator {
  (args: { token: string }): Promise<AuthTokenPayload | null>;
}

interface AuthTokenGenerator {
  (args: SystemLogin): Promise<string>;
}

interface CustomAccessPolicy {
  (token: AuthTokenPayload, req: ClientRequest): boolean;
}
interface AccessPolicyGenerator {
  (args: {
    groups: number | Array<number>;
    check?: CustomAccessPolicy;
  }): Middleware;
}