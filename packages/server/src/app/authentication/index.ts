import { decodeAuthToken, allow, AccessControlGroup, checkUserId } from "./middleware.js";
import {
  generateAuthToken,
  validateAuthToken,
  hashPassword,
  verifyPassword,
} from "./services.js";

const authentication = {
  generateAuthToken,
  validateAuthToken,
  hashPassword,
  verifyPassword,
  decodeAuthToken,
  allow,
  groups: AccessControlGroup,
  checkUserId
};

declare global {
  type Authentication = typeof authentication;
}

export default authentication;
