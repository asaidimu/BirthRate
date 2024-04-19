import { LoginCredentials, NewUserData, UserID, UserUpdate } from "../../../lib/validator.js";
const validator = {
  "POST:/authenticate": LoginCredentials,
  "POST:/create": NewUserData,
  "PUT:/deactivate": UserID,
  "PUT:/": UserUpdate
};

export default validator;
